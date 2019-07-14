import GameObject from "./interfaces/GameObject";
import Position from "./interfaces/Position";
import { COLOR_STICK_HEIGHT } from "./constant";

export default class ColorStick implements GameObject {
  private position: Position;
  private stickLength: number;

  public constructor(position: Position, stickLength: number) {
    this.position = position;
    this.stickLength = stickLength;
  }

  public draw(context: CanvasRenderingContext2D): undefined {
    context.strokeRect(
      this.position.x,
      this.position.y,
      this.stickLength,
      COLOR_STICK_HEIGHT
    );
  }
}
