export class Shipment2 {
  private _id: number;

  private _shippingAddress: string;

  private _shipmentStatus: string;

  private _order: number;


  constructor(id: number, shippingAddress: string, shipmentStatus: string, order: number) {
    this._id = id;
    this._shippingAddress = shippingAddress;
    this._shipmentStatus = shipmentStatus;
    this._order = order;
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get shippingAddress(): string {
    return this._shippingAddress;
  }

  set shippingAddress(value: string) {
    this._shippingAddress = value;
  }

  get shipmentStatus(): string {
    return this._shipmentStatus;
  }

  set shipmentStatus(value: string) {
    this._shipmentStatus = value;
  }

  get order(): number {
    return this._order;
  }

  set order(value: number) {
    this._order = value;
  }
}
