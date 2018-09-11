export class Recipe {
  public name: string;
  public description: string;
  public imagePath: string;


  constructor(name: string, dexcription: string, imagePath: string) {
    this.name = name;
    this.description = dexcription;
    this.imagePath = imagePath;
  }
}
