import Player from "./Player/Player";
import Level from "./Level";
import ColorStick from "./ColorStick";
import { CANVAS_DIMENSION } from "./constant";
import PlayerInputHandler from "./Player/PlayerInputHandler";

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
    // const playerPosition = level.getListOfColorStick()[0].getPosition();
    const player = new Player();
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
    const player = playerWithInputHandler.targetObject;
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
    playerWithInputHandler.reactToBufferedInputs();
    player.draw(canvasContext);
    // setTimeout(
    //   (): number =>
    //     requestAnimationFrame((): void =>
    //       this.draw(level, canvasContext, playerWithInputHandler)
    //     ),
    //     250
    // );
    setTimeout((): void => this.draw(level, canvasContext, playerWithInputHandler), 250)
    // requestAnimationFrame((): void => this.draw(level, canvasContext, player));
  }
}

export default GameManager;
