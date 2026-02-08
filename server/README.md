# How to Run the Notion Proxy Server

1.  **Environment Setup**
    You need to set the `NOTION_KEY` environment variable.
    Generate an "Internal Integration Token" at [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations).
    Share your Database (`2ee6f2c1c4f7809d8105cf7ed42911de`) with this integration (Click "..." on the Notion page -> Add connections -> Select your integration).

2.  **Run Server**
    ```bash
    cd server
    go mod tidy
    export NOTION_KEY="secret_YOUR_TOKEN_HERE"
    go run main.go
    ```
    Server will start on port 8080.

3.  **Expose via ngrok**
    ```bash
    ngrok http 8080
    ```

4.  **Update Client**
    Update `src/LeaderboardService.ts`:
    ```typescript
    const PROXY_URL = 'https://<your-ngrok-id>.ngrok.io/api';
    ```
    Then rebuild the game:
    ```bash
    npm run build
    ```
