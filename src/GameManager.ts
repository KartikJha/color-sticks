import Player from "./Player";
import Level from "./Level";
import ColorStick from "./ColorStick";
import { CANVAS_DIMENSION } from "./constant";

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
    level.getListOfColorStick().forEach((colorStick: ColorStick): void => {
      // colorStick.clear(canvasContext);
      colorStick.draw(canvasContext);
      colorStick.updatePosition();
    });
    player.draw(canvasContext);
    setTimeout(
      (): void =>
        requestAnimationFrame((): void =>
          this.draw(level, canvasContext, player)
        ),
      140
    );
    // requestAnimationFrame((): void => this.draw(level, canvasContext, player));
  }
}

export default GameManager;
