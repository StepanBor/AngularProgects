import {BookItem} from './BookItem';

export class ItemEntry {
  private _key: BookItem;
  private _value: number;


  constructor(key: BookItem, value: number) {
    this._key = key;
    this._value = value;
  }


  get key(): BookItem {
    return this._key;
  }

  set key(value: BookItem) {
    this._key = value;
  }

  get value(): number {
    return this._value;
  }

  set value(value: number) {
    this._value = value;
  }
}
