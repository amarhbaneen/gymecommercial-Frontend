import {Component, OnInit} from '@angular/core';
import {ProductService} from '../services/product.service';
import {Product} from '../common/product';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryID: number = 0;
  previousCategoryId: number = 0;
  searchMode: boolean = false;

  currentCategoryName: string = "";

  thePageNumber: number = 1;
  thePageSize: number = 1;
  theTotalElemnts: number = 0;


  constructor(private prodcutService: ProductService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    })
    console.log(this.thePageNumber, this.thePageSize, this.theTotalElemnts);
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchProdcuts();
    } else {
      this.handleListProducts()
    }


  }

  handleListProducts() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if (hasCategoryId) {

      this.currentCategoryID = +this.route.snapshot.paramMap.get('id')!;
      // get the "name" param string
      this.currentCategoryName = this.route.snapshot.paramMap.get('name')!;
    }
    // Check if we have a different category that previous
    if (this.previousCategoryId != this.currentCategoryID) {
      this.thePageNumber = 1;
    }
    console.log(`currentId ${this.currentCategoryID} and previous ${this.previousCategoryId} , the Page number = ${this.thePageNumber}`);


    this.prodcutService.getProductListPaginate(this.thePageNumber - 1, this.thePageSize, this.currentCategoryID).subscribe(
      data => {
        this.products = data._embedded.products,
          console.log(this.products)
        this.thePageNumber = data.page.number + 1 ,
          this.thePageSize = data.page.size;
        this.theTotalElemnts = data.page.totalElemnets;
      }
    )
  }

  private handleSearchProdcuts() {
    const keyWord: string = this.route.snapshot.paramMap.get('keyword')!;

    this.prodcutService.searchProducts(keyWord).subscribe(
      data => {
        this.products = data;
      }
    )

  }

  protected readonly Product = Product;
}
