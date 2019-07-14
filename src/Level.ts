import ColorStick from "./ColorStick";

class Level {
  private listOfColorStick: ColorStick[];

  public constructor(listOfColorStick: ColorStick[]) {
    this.listOfColorStick = listOfColorStick;
  }

  public get getListOfColorStick(): ColorStick[] {
    return this.listOfColorStick;
  }
}

export default Level;
