import Player from "./Player";
import Level from "./Level";

class GameManager  {
  // ctx: CanvasRenderingContext2D;
  constructor(level: Level, canvas: HTMLCanvasElement) {
    if (!canvas.getContext) {
      console.warn("Canvas not supported");
      return;
    }
    if (!level.listOfColorStick.length) {
      console.error('Empty level');
      return;
    }
    const playerPosition = level.listOfColorStick[0].position;
    const player = new Player(playerPosition);
    this.draw(level, <CanvasRenderingContext2D> canvas.getContext("2d"), player);
  }

  draw(
    level: Level,
    canvasContext: CanvasRenderingContext2D,
    player: Player
  ) {
    level.listOfColorStick.forEach(colorStick => {
      colorStick.draw(canvasContext);
    });    
    player.draw(canvasContext);
    requestAnimationFrame(() => this.draw(level, canvasContext, player));
  };

  /**
   * @todo 
   */
  handleUserInput() {

  }
}

export default GameManager;
