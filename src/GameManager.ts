import Player from "./Player/Player";
import { IScoreEntry } from "./LeaderboardService";
import LeaderboardService from "./LeaderboardService";
import Level from "./Level";
import ColorStick from "./ColorStick";
import { CANVAS_DIMENSION } from "./constant";
import PlayerInputHandler from "./Player/PlayerInputHandler";

class GameManager {
  private isRunning: boolean = true;
  private score: number = 0;
  private currentLevelIndex: number = 0;
  private playerName: string;
  private difficulty: string;

  public constructor(canvas: HTMLCanvasElement, difficulty: string = 'medium', playerName: string = 'Player 1') {
    this.playerName = playerName;
    this.difficulty = difficulty;
    if (!canvas.getContext) {
      console.warn("Canvas not supported");
      return;
    }
    // if (!level.getListOfColorStick().length) {
    //   console.error("Empty level");
    //   return;
    // }
    // const playerPosition = level.getListOfColorStick()[0].getPosition();
    const player = new Player();
    const level = new Level(0, difficulty);
    // player
    this.draw(
      level,
      canvas.getContext("2d") as CanvasRenderingContext2D,
      new PlayerInputHandler(player)
    );
  }

  public draw(
    level: Level,
    canvasContext: CanvasRenderingContext2D,
    playerWithInputHandler: PlayerInputHandler
  ): void {
    /**
     * draw each colorstick and
     * update its position for next redraw
     */
    canvasContext.clearRect(
      0,
      0,
      CANVAS_DIMENSION.width,
      CANVAS_DIMENSION.height
    );

    const player = playerWithInputHandler.targetObject;
    let collisionDetected = false;

    level.getListOfColorStick().forEach((colorStick: ColorStick): void => {
      // colorStick.draw(canvasContext);
      colorStick.draw(canvasContext);
      colorStick.updatePosition();

      if (this.checkCollision(player, colorStick)) {
        collisionDetected = true;
      }
    });

    if (collisionDetected) {
      this.gameOver();
      return;
    }

    playerWithInputHandler.reactToBufferedInputs();
    player.draw(canvasContext);

    // player falling vertically
    if (player.getPosition().y + 2 < CANVAS_DIMENSION.height) {
      player.updatePosition({ ...player.getPosition(), y: player.getPosition().y + 2 })
    } else {
      level.moveToNextLevel();
      player.resetPlayerPosition();
      this.currentLevelIndex++;
      this.updateHUD();
    }

    // Score Update
    this.score++;
    if (this.score % 10 === 0) this.updateHUD();

    if (this.isRunning) {
      setTimeout((): void => this.draw(level, canvasContext, playerWithInputHandler), 140)
    }
  }

  private checkCollision(player: Player, stick: ColorStick): boolean {
    const pPos = player.getPosition();
    const sPos = stick.getPosition();
    const pSize = 30; // Approximation

    // Basic AABB / Distance check
    // For now, assume stick is ~50x10.
    return (
      pPos.x < sPos.x + 50 &&
      pPos.x + pSize > sPos.x &&
      pPos.y < sPos.y + 10 &&
      pPos.y + pSize > sPos.y
    );
  }

  private updateHUD(): void {
    const scoreEl = document.getElementById('score-display');
    const levelEl = document.getElementById('level-display');
    if (scoreEl) scoreEl.innerText = this.score.toString();
    if (levelEl) levelEl.innerText = (this.currentLevelIndex + 1).toString();
  }

  private gameOver(): void {
    this.stop();
    alert(`Game Over! Score: ${this.score}`);

    LeaderboardService.saveScore(this.playerName, this.score, this.difficulty).then(saved => {
      if (!saved) {
        alert("Note: Score saved locally. Configuring GitHub Token required for global leaderboard.");
      }
      window.location.reload();
    });
  }

  public stop(): void {
    this.isRunning = false;
  }
}

export default GameManager;
