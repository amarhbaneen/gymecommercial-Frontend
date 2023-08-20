import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products : Product[] =[];
  currentCategoryID: number = 0;

  currentCategoryName: string = "";

  constructor(private prodcutService : ProductService,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    })

  }
  listProducts() {

    const hasCategoryId : boolean = this.route.snapshot.paramMap.has('id');
    if(hasCategoryId){

    this.currentCategoryID = +this.route.snapshot.paramMap.get('id')!;
      // get the "name" param string
      this.currentCategoryName = this.route.snapshot.paramMap.get('name')!;
    }


    this.prodcutService.getProductList(this.currentCategoryID).subscribe(
      data => {
        this.products = data;
      }
    )
  }

}
