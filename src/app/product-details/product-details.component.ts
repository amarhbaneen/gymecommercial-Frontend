import { Component, OnInit } from '@angular/core';
import {Product} from "../common/product";
import {ProductService} from "../services/product.service";
import {ActivatedRoute} from "@angular/router";
import {CartService} from "../services/cart.service";
import {CartItem} from "../common/cart-item";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product : Product | any;

  constructor(private productService:ProductService,private route:ActivatedRoute , private  cartService:CartService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      ()=>{
        this.handleProductDetails();
      }
    )
  }

  private handleProductDetails() {

      // @ts-ignore
      const theProductId: number = +this.route.snapshot.paramMap.get('id');


    this.productService.getProduct(theProductId).subscribe(
        (data: Product)=>{
        this.product = data;
      }
    )
  }

  protected readonly Product = Product;

  addtoCart() {
    const theCartItem = new CartItem(this.product);
    this.cartService.addToCart(theCartItem);
  }
}
