import { Component, OnInit } from '@angular/core';
import {ProductCategory} from "../common/product-category";
import {ProductService} from "../services/product.service";

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit {

  productCategories : ProductCategory [] = [];

  constructor(private  proudctService:ProductService) { }

  ngOnInit(): void {
    this.listProductCategories();
  }


  private listProductCategories() {
    this.proudctService.getProductCategories().subscribe(
      data =>{
        this.productCategories = data;
      },
      error => {
        console.error('Error fetching product categories:', error);
      }
    )
  }
}
