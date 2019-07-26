import GameObject from "./interfaces/GameObject";
import Position from "./interfaces/Position";
import { COLOR_STICK_HEIGHT, CANVAS_DIMENSION } from "./constant";

export default class ColorStick implements GameObject {
  private position: Position;
  private stickLength: number;
  private velocity: number;

  public constructor(
    position: Position,
    stickLength: number,
    velocity: number
  ) {
    this.position = position;
    this.stickLength = stickLength;
    this.velocity = velocity;
  }

  public getPosition(): Position {
    return this.position;
  }

  public getStickLength(): number {
    return this.stickLength;
  }

  public draw(context: CanvasRenderingContext2D): void {
    context.strokeRect(
      this.position.x,
      this.position.y,
      this.stickLength,
      COLOR_STICK_HEIGHT
    );
  }

  public updatePosition(): void {
    const newX = this.position.x + this.velocity * this.stickLength;

    /**
     * if out of or on bounds then set on bounds
     * and reverse direction
     */
    if (newX > CANVAS_DIMENSION.width || newX < 0) {
      if (this.velocity < 0) {
        this.position.x = 0;
        this.velocity *= -1;
      } else {
        this.position.x = 800 - this.stickLength;
        this.velocity *= -1;
      }
    } else {
      this.position.x = newX;
    }
  }

  public clear(context: CanvasRenderingContext2D): void {
    const { x, y } = this.getPosition();
    context.clearRect(x, y, this.stickLength, COLOR_STICK_HEIGHT);
  }
}
