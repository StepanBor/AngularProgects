export class Shipment2 {
  public id: number;

  public shippingAddress: string;

  public shipmentStatus: string;

  public order: number;


  constructor(id: number, shippingAddress: string, shipmentStatus: string, order: number) {
    this.id = id;
    this.shippingAddress = shippingAddress;
    this.shipmentStatus = shipmentStatus;
    this.order = order;
  }


  // getId(): number {
  //   return this.id;
  // }
  //
  // setId(value: number) {
  //   this.id = value;
  // }
  //
  // getShippingAddress(): string {
  //   return this.shippingAddress;
  // }
  //
  // setShippingAddress(value: string) {
  //   this.shippingAddress = value;
  // }
  //
  // getShipmentStatus(): string {
  //   return this.shipmentStatus;
  // }
  //
  // setShipmentStatus(value: string) {
  //   this.shipmentStatus = value;
  // }
  //
  // getOrder(): number {
  //   return this.bookItem;
  // }
  //
  // setOrder(value: number) {
  //   this.bookItem = value;
  // }
}
