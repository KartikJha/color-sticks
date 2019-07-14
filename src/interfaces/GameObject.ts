import Position from "./Position";

interface GameObject {
  getPosition: () => Position;
  velocity?: number;
  draw: Function;
}

export default GameObject;
