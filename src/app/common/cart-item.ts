import {Product} from "./product";

export class CartItem {
  id:string;
  name:string;
  imageUrl:string;
  unitPrice:number;
  quanity:number;

  constructor(product: Product) {
    this.id = product.productId;
    this.name =product.name;
    this.imageUrl= product.imageUrl;
    this.unitPrice = product.price;
    this.quanity =1;

  }
}
