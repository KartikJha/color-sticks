import Player from "./Player";
import Level from "./Level";

class GameManager {
  public constructor(level: Level, canvas: HTMLCanvasElement) {
    if (!canvas.getContext) {
      console.warn("Canvas not supported");
      return;
    }
    if (!level.listOfColorStick.length) {
      console.error("Empty level");
      return;
    }
    const playerPosition = level.listOfColorStick[0].position;
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
  ): undefined {
    level.getListOfColorStick.forEach((colorStick): undefined => {
      colorStick.draw(canvasContext);
    });
    player.draw(canvasContext);
    requestAnimationFrame((): undefined =>
      this.draw(level, canvasContext, player)
    );
  }

  // /**
  //  * @todo
  //  */
  // handleUserInput() {
  //   // PYNX
  // }
}

export default GameManager;
