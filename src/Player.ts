import GameObject from './interfaces/GameObject';
import Position from './interfaces/Position';

export default class Player implements GameObject {
  position: Position;
  
  constructor(position: Position) {
    this.position = position;
  }
  
  draw(context: CanvasRenderingContext2D) {
    const { x, y } = this.position;
    context.fillRect(x, y, 30, 30);
  }
}