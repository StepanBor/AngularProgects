import {BookItem} from './BookItem';


export class Order {


  private id: number;

  private orderList: [BookItem];

  private orderPrice: number;

  private Client client;

  private Shipment shipment;

  private String status;

  
  private Date orderDate;

}
