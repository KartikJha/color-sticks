import GameObject from "./interfaces/GameObject";
import Position from "./interfaces/Position";

export default class Player implements GameObject {
  private position: Position;

  public constructor(position: Position) {
    this.position = position;
  }

  public draw(context: CanvasRenderingContext2D): undefined {
    const { x, y } = this.position;
    context.fillRect(x, y, 30, 30);
  }
}
