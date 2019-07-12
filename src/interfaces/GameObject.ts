import Position from './Position';

interface GameObject {
  position: Position;
  velocity?: number;
  draw: Function;
}

export default GameObject;
