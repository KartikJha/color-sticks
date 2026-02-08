import GameManager from "./GameManager";
import ColorStick from "./ColorStick";
import Level from "./Level";
import { CANVAS_ID } from "./constant";
import LeaderboardService, { IScoreEntry } from "./LeaderboardService";

const intializeGame = (): void => {
  const canvas = document.getElementById(CANVAS_ID) as HTMLCanvasElement;
  const overlay = document.getElementById('game-overlay');
  const startMenu = document.getElementById('start-menu');
  const leaderboardMenu = document.getElementById('leaderboard-menu');
  const startBtn = document.getElementById('start-btn');
  const leaderboardBtn = document.getElementById('leaderboard-btn');
  const backBtn = document.getElementById('back-btn');
  const nameInput = document.getElementById('player-name') as HTMLInputElement;
  const difficultySelect = document.getElementById('difficulty') as HTMLSelectElement;
  const hud = document.getElementById('hud');

  let currentGame: GameManager | null = null;

  startBtn.addEventListener('click', () => {
    const name = nameInput.value || "Player 1";
    const difficulty = difficultySelect.value;

    // Hide Overlay
    overlay.classList.add('hidden');
    hud.classList.remove('hidden');

    // Start Game
    if (currentGame) {
      currentGame.stop();
    }
    currentGame = new GameManager(canvas, difficulty, name);
  });

  leaderboardBtn.addEventListener('click', async () => {
    startMenu.classList.add('hidden');
    leaderboardMenu.classList.remove('hidden');

    const scoresList = document.getElementById('scores-list');
    scoresList.innerHTML = 'Loading...';

    const scores = await LeaderboardService.fetchScores();

    if (scores.length === 0) {
      scoresList.innerHTML = '<p>No scores yet.</p>';
    } else {
      let html = '<table style="width:100%; text-align:left; color: limegreen; font-family: VT323; font-size: 24px;">';
      html += '<tr><th>Rank</th><th>Name</th><th>Score</th><th>Diff</th></tr>';
      scores.forEach((s, i) => {
        html += `<tr><td>${i + 1}</td><td>${s.name}</td><td>${s.score}</td><td>${s.difficulty}</td></tr>`;
      });
      html += '</table>';
      scoresList.innerHTML = html;
    }
  });

  backBtn.addEventListener('click', () => {
    leaderboardMenu.classList.add('hidden');
    startMenu.classList.remove('hidden');
  });
};

document.addEventListener('DOMContentLoaded', intializeGame);
