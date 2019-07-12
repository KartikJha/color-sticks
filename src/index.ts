import GameManager from "./GameManager";
import ColorStick from "./ColorStick";
import Level from './Level';
import { CANVAS_ID } from "./constant";

const intializeGame = () => {
  // GameManager will be responsible for controlling the
  // gameplay
  const level: Level = new Level([new ColorStick({x: 10, y: 10 }, 20), new ColorStick({x: 30, y: 10 }, 20), new ColorStick({x: 10, y: 60 }, 30)]);

  const canvas = <HTMLCanvasElement> document.getElementById(CANVAS_ID);
  /**
   * game manager is responsible for
   * drawing gameObjects and handling user input
   * and checking if the game has ended
   */
  new GameManager(level, canvas);
};
console.log('Script start');
intializeGame();
