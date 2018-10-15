import {BookItem} from './BookItem';

export class ItemEntry {
  public key: BookItem;
  public value: number;


  constructor(key: BookItem, value: number) {
    this.key = key;
    this.value = value;
  }

  // getKey(): BookItem {
  //   return this.key;
  // }
  //
  // setKey(value: BookItem) {
  //   this.key = value;
  // }
  //
  // getValue(): number {
  //   return this.value;
  // }
  //
  // setValue(value: number) {
  //   this.value = value;
  // }
}
