import ColorStick from './ColorStick';

class Level {
  listOfColorStick: Array<ColorStick>;

  constructor(listOfColorStick: Array<ColorStick>) {
    this.listOfColorStick = listOfColorStick;
  }

  get listOfColorStickV() {
    return this.listOfColorStick;
  }
}

export default Level;
