import GameManager from "./GameManager";
import ColorStick from "./ColorStick";
import Level from "./Level";
import { CANVAS_ID } from "./constant";

const intializeGame = (): boolean => {
  // GameManager will be responsible for controlling the
  // gameplay


  const canvas = document.getElementById(CANVAS_ID) as HTMLCanvasElement;
  /**
   * game manager is responsible for
   * drawing gameObjects and handling user input
   * and checking if the game has ended
   */
  new GameManager(canvas);
  // const level: Level = new Level([
  //   new ColorStick({ x: 10, y: 10 }, 40, 2),
  //   new ColorStick({ x: 60, y: 60 }, 50, 3),
  //   new ColorStick({ x: 10, y: 110 }, 70, -1)
  // ]);
  return true;
};
intializeGame();
