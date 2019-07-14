import Position from "./Position";

interface GameObject {
  private position: Position;
  private velocity?: number;
  draw: Function;
}

export default GameObject;
