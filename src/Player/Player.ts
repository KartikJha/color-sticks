import GameObject from "../interfaces/GameObject";
import Position from "../interfaces/Position";

export default class Player implements GameObject {

  private position: Position;

  clear: Function;

  setupInputListener: Function;

  public constructor(position : Position = {x: 0, y: 0}) {
    this.position = position;
  }

  public getPosition(): Position {
    return this.position;
  }

  public draw(context: CanvasRenderingContext2D): void {
    const { x, y } = this.position;
    context.fillRect(x, y, 30, 30);
  }

  public updatePosition(position: Position) {
    this.position = position;
  }
}
