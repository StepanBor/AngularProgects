export class Task1 {

  public id: number;

  public description: string;

  public status: string;

  public date: Date;

  constructor(id: number, description: string, status: string, date: Date) {
    this.id = id;
    this.description = description;
    this.status = status;
    this.date = date;
  }

}
