package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"sync"
	"time"

	"golang.org/x/time/rate"
)

const (
	NotionAPIURL  = "https://api.notion.com/v1"
	NotionVersion = "2022-06-28"
	DefaultPort   = "8080"
	DatabaseID    = "2ee6f2c1c4f7809d8105cf7ed42911de" // Extracted from user URL
)

// Config holds server configuration
type Config struct {
	NotionKey string
	Port      string
}

// RateLimiter manages IP-based rate limiting
type RateLimiter struct {
	ips map[string]*rate.Limiter
	mu  sync.Mutex
	r   rate.Limit
	b   int
}

func NewRateLimiter(r rate.Limit, b int) *RateLimiter {
	return &RateLimiter{
		ips: make(map[string]*rate.Limiter),
		r:   r,
		b:   b,
	}
}

func (i *RateLimiter) GetLimiter(ip string) *rate.Limiter {
	i.mu.Lock()
	defer i.mu.Unlock()

	limiter, exists := i.ips[ip]
	if !exists {
		limiter = rate.NewLimiter(i.r, i.b)
		i.ips[ip] = limiter
	}

	return limiter
}

// Global rate limiter: 5 requests per second, burst of 10
var limiter = NewRateLimiter(5, 10)

func main() {
	config := Config{
		NotionKey: os.Getenv("NOTION_KEY"),
		Port:      os.Getenv("PORT"),
	}

	if config.Port == "" {
		config.Port = DefaultPort
	}

	if config.NotionKey == "" {
		log.Println("WARNING: NOTION_KEY environment variable is not set. Requests to Notion will fail.")
	}

	mux := http.NewServeMux()

	mux.HandleFunc("/api/scores", handleScores(config))
	mux.HandleFunc("/api/save", handleSaveScore(config))
	mux.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("OK"))
	})

	log.Printf("Server starting on port %s...", config.Port)
	if err := http.ListenAndServe(":"+config.Port, enableCORS(limitMiddleware(mux))); err != nil {
		log.Fatalf("Server failed to start: %v", err)
	}
}

// Middleware
func enableCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*") // Allow all origins for ngrok/dev
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func limitMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ip := r.RemoteAddr // Simple IP extraction, ideally handle X-Forwarded-For if behind proxy
		limiter := limiter.GetLimiter(ip)
		if !limiter.Allow() {
			http.Error(w, "Too Many Requests", http.StatusTooManyRequests)
			return
		}
		next.ServeHTTP(w, r)
	})
}

// Handlers

func handleScores(cfg Config) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodGet {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			return
		}

		// Query Notion Database
		url := fmt.Sprintf("%s/databases/%s/query", NotionAPIURL, DatabaseID)

		// Sort by Score descending
		reqBody := []byte(`{
			"sorts": [
				{
					"property": "Score",
					"direction": "descending"
				}
			],
			"page_size": 100
		}`)

		req, err := http.NewRequest("POST", url, bytes.NewBuffer(reqBody))
		if err != nil {
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
			return
		}

		setNotionHeaders(req, cfg.NotionKey)

		client := &http.Client{Timeout: 10 * time.Second}
		resp, err := client.Do(req)
		if err != nil {
			log.Printf("Error contacting Notion: %v", err)
			http.Error(w, "Failed to contact Notion", http.StatusBadGateway)
			return
		}
		defer resp.Body.Close()

		if resp.StatusCode != http.StatusOK {
			body, _ := io.ReadAll(resp.Body)
			log.Printf("Notion Error (%d): %s", resp.StatusCode, string(body))
			http.Error(w, "Notion API Error", resp.StatusCode)
			return
		}

		// Parse Notion Response and transform to simple JSON
		var notionResp struct {
			Results []struct {
				Properties struct {
					Name struct {
						Title []struct {
							PlainText string `json:"plain_text"`
						} `json:"title"`
					} `json:"Name"`
					Score struct {
						Number float64 `json:"number"`
					} `json:"Score"`
					Difficulty struct {
						Select struct {
							Name string `json:"name"`
						} `json:"select"`
					} `json:"Difficulty"`
				} `json:"properties"`
			} `json:"results"`
		}

		if err := json.NewDecoder(resp.Body).Decode(&notionResp); err != nil {
			http.Error(w, "Failed to parse Notion response", http.StatusInternalServerError)
			return
		}

		type ScoreEntry struct {
			Name       string  `json:"name"`
			Score      float64 `json:"score"`
			Difficulty string  `json:"difficulty"`
		}

		var scores []ScoreEntry
		for _, page := range notionResp.Results {
			name := "Anonymous"
			if len(page.Properties.Name.Title) > 0 {
				name = page.Properties.Name.Title[0].PlainText
			}
			scores = append(scores, ScoreEntry{
				Name:       name,
				Score:      page.Properties.Score.Number,
				Difficulty: page.Properties.Difficulty.Select.Name,
			})
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(scores)
	}
}

func handleSaveScore(cfg Config) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			return
		}

		var payload struct {
			Name       string `json:"name"`
			Score      int    `json:"score"`
			Difficulty string `json:"difficulty"`
		}

		if err := json.NewDecoder(r.Body).Decode(&payload); err != nil {
			http.Error(w, "Invalid JSON", http.StatusBadRequest)
			return
		}

		// Create Page in Notion
		url := fmt.Sprintf("%s/pages", NotionAPIURL)

		notionBody := map[string]interface{}{
			"parent": map[string]string{"database_id": DatabaseID},
			"properties": map[string]interface{}{
				"Name": map[string]interface{}{
					"title": []map[string]interface{}{
						{
							"text": map[string]string{"content": payload.Name},
						},
					},
				},
				"Score": map[string]interface{}{
					"number": payload.Score,
				},
				"Difficulty": map[string]interface{}{
					"select": map[string]string{"name": payload.Difficulty},
				},
			},
		}

		jsonBody, _ := json.Marshal(notionBody)
		req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonBody))
		if err != nil {
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
			return
		}

		setNotionHeaders(req, cfg.NotionKey)

		client := &http.Client{Timeout: 10 * time.Second}
		resp, err := client.Do(req)
		if err != nil {
			log.Printf("Error Saving to Notion: %v", err)
			http.Error(w, "Failed to contact Notion", http.StatusBadGateway)
			return
		}
		defer resp.Body.Close()

		if resp.StatusCode != http.StatusOK {
			body, _ := io.ReadAll(resp.Body)
			log.Printf("Notion Save Error (%d): %s", resp.StatusCode, string(body))
			http.Error(w, "Failed to save score", resp.StatusCode)
			return
		}

		w.WriteHeader(http.StatusCreated)
		w.Write([]byte(`{"status":"success"}`))
	}
}

func setNotionHeaders(req *http.Request, key string) {
	req.Header.Set("Authorization", "Bearer "+key)
	req.Header.Set("Notion-Version", NotionVersion)
	req.Header.Set("Content-Type", "application/json")
}
