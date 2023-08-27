import { Injectable } from '@angular/core';
import {CartItem} from "../common/cart-item";
import {Subject} from "rxjs";



@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems:CartItem[] = []

  totalPrice :Subject<number> = new Subject<number>()
  totalQuantity : Subject<number> = new Subject<number>()
  constructor() { }

  addToCart(theCartItem:CartItem){
    // check if we already have the item
    let alreadyExistsInCart: boolean = false;
    let existingCartItem : CartItem = undefined!;
    if(this.cartItems.length > 0){
      existingCartItem = this.cartItems.find( tempCarItem => tempCarItem.id == theCartItem.id)!;

      alreadyExistsInCart = (existingCartItem != undefined);

    }
    if(alreadyExistsInCart){
      existingCartItem.quanity++;

    }
    else {
      this.cartItems.push(theCartItem);
    }

    this.computeTotals();



  }

 computeTotals() {
    let totalPriceValue : number = 0;
    let totalQuantityValue: number = 0;
    for (let currentItem of this.cartItems){
     totalPriceValue += currentItem.unitPrice * currentItem.quanity;
     totalQuantityValue += currentItem.quanity;
    }
   this.totalPrice.next(totalPriceValue);
   this.totalQuantity.next(totalQuantityValue);

   this.logCartData(totalQuantityValue,totalPriceValue);
  }
  logCartData(totalQuantityValue: number, totalPriceValue: number) {
    console.log('content of the cart');
    for(let tempCartItem of this.cartItems){
      const subTotalPrice = tempCartItem.unitPrice * tempCartItem.quanity;
      console.log(`name:${tempCartItem.name} , quantity = ${tempCartItem.quanity} , unitPrice = ${tempCartItem.unitPrice} . Total = ${subTotalPrice}`);
    }
    console.log(`total price : ${totalPriceValue.toFixed(2)} , total quantity : ${totalQuantityValue} `);
    console.log('-------------------------------------------------------------------------------');
  }

  decrementQuantity(tempCartItem: CartItem) {
    tempCartItem.quanity--;
    if(tempCartItem.quanity == 0){
      this.remove(tempCartItem);
    }
    else {}
    this.computeTotals();
  }

 remove(tempCartItem: CartItem) {
    const ItemIndex = this.cartItems.findIndex(tempItem => tempItem.id == tempCartItem.id);
    if(ItemIndex > -1){
      this.cartItems.splice(ItemIndex,1);
      this.computeTotals();
    }
  }
}
