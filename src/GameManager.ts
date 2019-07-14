import Player from "./Player";
import Level from "./Level";
import ColorStick from "./ColorStick";

class GameManager {
  public constructor(level: Level, canvas: HTMLCanvasElement) {
    if (!canvas.getContext) {
      console.warn("Canvas not supported");
      return;
    }
    if (!level.getListOfColorStick().length) {
      console.error("Empty level");
      return;
    }
    const playerPosition = level.getListOfColorStick()[0].getPosition();
    const player = new Player(playerPosition);
    this.draw(
      level,
      canvas.getContext("2d") as CanvasRenderingContext2D,
      player
    );
  }

  public draw(
    level: Level,
    canvasContext: CanvasRenderingContext2D,
    player: Player
  ): void {
    level.getListOfColorStick().forEach((colorStick: ColorStick): void => {
      colorStick.draw(canvasContext);
    });
    player.draw(canvasContext);
    requestAnimationFrame((): void => this.draw(level, canvasContext, player));
  }
}

export default GameManager;
