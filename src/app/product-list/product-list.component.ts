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
  thePageSize: number = 2;
  theTotalElements: number = 0;
  private previousKeyword: String = '';


  constructor(private productService: ProductService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    })
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
    if(this.currentCategoryID != this.previousCategoryId){
      this.thePageNumber = 1;
    }
    this.previousCategoryId = this.currentCategoryID;
    this.productService.getProductListPaginate(this.thePageNumber - 1, this.thePageSize, this.currentCategoryID).subscribe(
      data => {
        this.products = data._embedded.products;
        this.thePageNumber = data.page.number + 1;
        this.thePageSize = data.page.size;
        this.theTotalElements = data.page.totalElements;

      }
    )
  }

  private handleSearchProdcuts() {
    const keyWord: string = this.route.snapshot.paramMap.get('keyword')!;
    if(keyWord != this.previousKeyword){
      this.thePageNumber =1;
    }
    this.previousKeyword = keyWord;

    this.productService.searchProductsPaginate(this.thePageNumber - 1, this.thePageSize,keyWord).subscribe(
      data => {
        this.products = data._embedded.products;
        this.thePageNumber = data.page.number + 1;
        this.thePageSize = data.page.size;
        this.theTotalElements = data.page.totalElements;

      }
    )

  }

  protected readonly Product = Product;

  UpdatePageSize(PageSizeNewValue: string) {
    this.thePageSize =+ PageSizeNewValue;
    this.thePageNumber=1;
    this.listProducts();
  }
}
