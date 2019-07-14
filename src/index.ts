import GameManager from "./GameManager";
import ColorStick from "./ColorStick";
import Level from "./Level";
import { CANVAS_ID } from "./constant";

const intializeGame = (): boolean => {
  // GameManager will be responsible for controlling the
  // gameplay
  const level: Level = new Level([
    new ColorStick({ x: 10, y: 10 }, 40),
    new ColorStick({ x: 60, y: 10 }, 50),
    new ColorStick({ x: 10, y: 60 }, 70)
  ]);

  const canvas = document.getElementById(CANVAS_ID) as HTMLCanvasElement;
  /**
   * game manager is responsible for
   * drawing gameObjects and handling user input
   * and checking if the game has ended
   */
  new GameManager(level, canvas);

  return true;
};
intializeGame();
