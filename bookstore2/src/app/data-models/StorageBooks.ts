import {StorageEntry} from './StorageEntry';

export class StorageBooks {

  public id: number;

  public storageAddress: string;

  public storagePhone: string;

  public storageEntryList: StorageEntry[];

  constructor(id: number, storageAddress: string, storagePhone: string, storageEntryList: StorageEntry[]) {
    this.id = id;
    this.storageAddress = storageAddress;
    this.storagePhone = storagePhone;
    this.storageEntryList = storageEntryList;
  }
}
