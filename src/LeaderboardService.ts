export interface IScoreEntry {
    name: string;
    score: number;
    difficulty: string;
    date: string;
}

const PROXY_URL = 'https://88bf2a398cfb.ngrok-free.app/api'; // User to update via ngrok

class LeaderboardService {

    public static async fetchScores(): Promise<IScoreEntry[]> {
        try {
            const response = await fetch(`${PROXY_URL}/scores`);
            if (!response.ok) {
                throw new Error('Failed to fetch scores from proxy');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching scores:', error);
            // Fallback to local? Or empty
            return [];
        }
    }

    public static async saveScore(name: string, score: number, difficulty: string): Promise<boolean> {
        try {
            const response = await fetch(`${PROXY_URL}/save`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, score, difficulty })
            });

            if (!response.ok) {
                throw new Error(`Proxy Error: ${response.statusText}`);
            }

            console.log('Score saved to Notion via Proxy!');
            return true;

        } catch (error) {
            console.error('Error saving score to Proxy:', error);
            this.saveLocally(name, score, difficulty);
            return false;
        }
    }

    private static saveLocally(name: string, score: number, difficulty: string) {
        const key = 'color-sticks-local-scores';
        const existing = JSON.parse(localStorage.getItem(key) || '[]');
        existing.push({ name, score, difficulty, date: new Date().toISOString() });
        localStorage.setItem(key, JSON.stringify(existing));
        console.log('Score saved locally (Fallback).');
    }

    public static getLocalScores(): IScoreEntry[] {
        return JSON.parse(localStorage.getItem('color-sticks-local-scores') || '[]');
    }
}

export default LeaderboardService;
