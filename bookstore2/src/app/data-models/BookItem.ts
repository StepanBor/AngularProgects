export class BookItem {

  private _id: number;

  private _bookName: string;

  private _description: string;

  private _author: string;

  private _publisher: string;

  private _category: string;

  private _price: number;

  private _storageBooks: number;

  constructor(id: number, bookName: string, description: string,
              author: string, publisher: string, category: string,
              price: number, storageBooks: number) {
    this._id = id;
    this._bookName = bookName;
    this._description = description;
    this._author = author;
    this._publisher = publisher;
    this._category = category;
    this._price = price;
    this._storageBooks = storageBooks;
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get bookName(): string {
    return this._bookName;
  }

  set bookName(value: string) {
    this._bookName = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get author(): string {
    return this._author;
  }

  set author(value: string) {
    this._author = value;
  }

  get publisher(): string {
    return this._publisher;
  }

  set publisher(value: string) {
    this._publisher = value;
  }

  get category(): string {
    return this._category;
  }

  set category(value: string) {
    this._category = value;
  }

  get price(): number {
    return this._price;
  }

  set price(value: number) {
    this._price = value;
  }

  get storageBooks(): number {
    return this._storageBooks;
  }

  set storageBooks(value: number) {
    this._storageBooks = value;
  }
}
