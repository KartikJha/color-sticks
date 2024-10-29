import Position from "./Position";

interface GameObject {
  getPosition: () => Position;
  draw: Function;
  clear: Function;
  updatePosition: Function;
}

export default GameObject;
