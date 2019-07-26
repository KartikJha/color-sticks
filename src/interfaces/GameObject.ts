import Position from "./Position";

interface GameObject {
  getPosition: () => Position;
  draw: Function;
  clear: Function;
}

export default GameObject;
