import {BookItem} from './BookItem';

export class StorageEntry {

  public bookItemId: number;

  public copiesInStock: number;


  constructor(bookItemId: number, copiesInStock: number) {
    this.bookItemId = bookItemId;
    this.copiesInStock = copiesInStock;
  }
}
