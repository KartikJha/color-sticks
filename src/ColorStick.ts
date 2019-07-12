import GameObject from './interfaces/GameObject';
import Position from './interfaces/Position';
import { COLOR_STICK_HEIGHT } from './constant';

export default class ColorStick implements GameObject {
  position: Position;
  stickLength: number;

  constructor(position: Position, stickLength: number) {
    this.position = position;
    this.stickLength = stickLength;
  }  

  draw(context: CanvasRenderingContext2D) {
    context.strokeRect(this.position.x, this.position.y, this.stickLength, COLOR_STICK_HEIGHT);
  }
} 

