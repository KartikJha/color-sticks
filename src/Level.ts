import ColorStick from './ColorStick'
import Position from './interfaces/Position'

// export const LEVEL_CONFIG = [
//   // Level 1
//   [
//     [{ x: 10, y: 10 }, 40, 2],
//     [{ x: 60, y: 60 }, 50, 3],
//     [{ x: 10, y: 110 }, 70, -1]
//   ],
//   // Level 2 (adding more elements with random positions)
//   [
//     [{ x: 20, y: 40 }, 35, 2],
//     [{ x: 80, y: 90 }, 45, 1],
//     [{ x: 150, y: 120 }, 55, -2],
//     [{ x: 200, y: 50 }, 65, 3]
//   ],
//   // Level 3
//   [
//     [{ x: 30, y: 60 }, 40, 1],
//     [{ x: 100, y: 110 }, 50, -1],
//     [{ x: 190, y: 130 }, 60, 2],
//     [{ x: 240, y: 170 }, 70, 1],
//     [{ x: 270, y: 60 }, 75, -3]
//   ],
//   // Level 4
//   [
//     [{ x: 40, y: 30 }, 35, 1],
//     [{ x: 90, y: 80 }, 45, 2],
//     [{ x: 130, y: 160 }, 55, -2],
//     [{ x: 220, y: 190 }, 60, 1],
//     [{ x: 300, y: 140 }, 70, -1],
//     [{ x: 350, y: 60 }, 80, 2]
//   ],
//   // Level 5
//   [
//     [{ x: 50, y: 100 }, 40, -1],
//     [{ x: 120, y: 140 }, 45, 2],
//     [{ x: 180, y: 90 }, 55, -3],
//     [{ x: 250, y: 160 }, 60, 1],
//     [{ x: 310, y: 200 }, 65, 0],
//     [{ x: 360, y: 120 }, 70, -2],
//     [{ x: 400, y: 80 }, 75, 3]
//   ],
//   // Level 6 (progressively increasing number of elements)
//   [
//     [{ x: 20, y: 50 }, 30, 1],
//     [{ x: 70, y: 100 }, 35, 2],
//     [{ x: 130, y: 150 }, 40, -1],
//     [{ x: 180, y: 200 }, 50, 3],
//     [{ x: 230, y: 170 }, 60, 2],
//     [{ x: 280, y: 90 }, 65, -2],
//     [{ x: 340, y: 130 }, 75, 1],
//     [{ x: 400, y: 180 }, 80, -3]
//   ]
// ]

class Level {
  private listOfColorStick: ColorStick[]
  private levelList: Array<Array<Array<Object>>> = [
    // Level 1 (3 elements, evenly spaced in y-range 0 to 800)
    [
      [{ x: 10, y: 0 }, 40, 2],
      [{ x: 60, y: 400 }, 50, 3],
      [{ x: 10, y: 800 }, 70, -1]
    ],
    // Level 2 (4 elements, evenly spaced in y-range 0 to 800)
    [
      [{ x: 20, y: 0 }, 35, 2],
      [{ x: 80, y: 266 }, 45, 1],
      [{ x: 150, y: 533 }, 55, -2],
      [{ x: 200, y: 800 }, 65, 3]
    ],
    // Level 3 (5 elements, evenly spaced in y-range 0 to 800)
    [
      [{ x: 30, y: 0 }, 40, 1],
      [{ x: 100, y: 200 }, 50, -1],
      [{ x: 190, y: 400 }, 60, 2],
      [{ x: 240, y: 600 }, 70, 1],
      [{ x: 270, y: 800 }, 75, -3]
    ],
    // Level 4 (6 elements, evenly spaced in y-range 0 to 800)
    [
      [{ x: 40, y: 0 }, 35, 1],
      [{ x: 90, y: 160 }, 45, 2],
      [{ x: 130, y: 320 }, 55, -2],
      [{ x: 220, y: 480 }, 60, 1],
      [{ x: 300, y: 640 }, 70, -1],
      [{ x: 350, y: 800 }, 80, 2]
    ],
    // Level 5 (7 elements, evenly spaced in y-range 0 to 800)
    [
      [{ x: 50, y: 0 }, 40, -1],
      [{ x: 120, y: 133 }, 45, 2],
      [{ x: 180, y: 266 }, 55, -3],
      [{ x: 250, y: 400 }, 60, 1],
      [{ x: 310, y: 533 }, 65, 0],
      [{ x: 360, y: 666 }, 70, -2],
      [{ x: 400, y: 800 }, 75, 3]
    ],
    // Level 6 (8 elements, evenly spaced in y-range 0 to 800)
    [
      [{ x: 20, y: 0 }, 30, 1],
      [{ x: 70, y: 114 }, 35, 2],
      [{ x: 130, y: 228 }, 40, -1],
      [{ x: 180, y: 342 }, 50, 3],
      [{ x: 230, y: 456 }, 60, 2],
      [{ x: 280, y: 570 }, 65, -2],
      [{ x: 340, y: 684 }, 75, 1],
      [{ x: 400, y: 800 }, 80, -3]
    ]
  ];
  
  private currentLevel: number = 0
  
  private setColorSticks(currentLevel: number): void {
    this.listOfColorStick = this.levelList[currentLevel].map(
      colorStickConfig =>
        new ColorStick(
          colorStickConfig[0] as Position,
          colorStickConfig[1] as number,
          colorStickConfig[2] as number
        )
    )
  }

  public constructor(currentLevel: number = 0) {
    this.setColorSticks(currentLevel);
  }

  public getListOfColorStick(): ColorStick[] {
    return this.listOfColorStick
  }

  public moveToNextLevel(nextLevel: number = -1): Level {
    if (nextLevel != -1) {
      this.setColorSticks(nextLevel);
      return this;
    } 
    if (this.currentLevel + 1 < this.levelList.length) {
      this.setColorSticks(this.currentLevel + 1)
      this.currentLevel++;
      return this;
    }
  }

}

export default Level
