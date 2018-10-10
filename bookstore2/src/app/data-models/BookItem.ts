export class BookItem {

  public id: number;

  public bookName: string;

  public description: string;

  public author: string;

  public publisher: string;

  public category: string;

  public price: number;

  public storageBooks: number;

  public rating: number;

  public ISBN: string;

  constructor(id: number, bookName: string, description: string,
              author: string, publisher: string, category: string,
              price: number, storageBooks: number, raiting: number, ISBN: string) {
    this.id = id;
    this.bookName = bookName;
    this.description = description;
    this.author = author;
    this.publisher = publisher;
    this.category = category;
    this.price = price;
    this.storageBooks = storageBooks;
    this.rating = raiting;
    this.ISBN = ISBN;
  }


  // getId(): number {
  //   return this.id;
  // }
  //
  // setId(value: number) {
  //   this.id = value;
  // }
  //
  // getBookName(): string {
  //   return this.bookName;
  // }
  //
  // setBookName(value: string) {
  //   this.bookName = value;
  // }
  //
  // getDescription(): string {
  //   return this.description;
  // }
  //
  // setDescription(value: string) {
  //   this.description = value;
  // }
  //
  // getAuthor(): string {
  //   return this.author;
  // }
  //
  // setAuthor(value: string) {
  //   this.author = value;
  // }
  //
  // getPublisher(): string {
  //   return this.publisher;
  // }
  //
  // setPublisher(value: string) {
  //   this.publisher = value;
  // }
  //
  // getCategory(): string {
  //   return this.category;
  // }
  //
  // setCategory(value: string) {
  //   this.category = value;
  // }
  //
  // getPrice(): number {
  //   return this.price;
  // }
  //
  // setPrice(value: number) {
  //   this.price = value;
  // }
  //
  // getStorageBooks(): number {
  //   return this.storageBooks;
  // }
  //
  // setStorageBooks(value: number) {
  //   this.storageBooks = value;
  // }
}
