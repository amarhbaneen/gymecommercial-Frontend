import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import {map} from 'rxjs';
import {ProductCategory} from "../common/product-category";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl ='http://localhost:8080/api/products';

  private CategoryURL = 'http://localhost:8080/api/product-category';



  constructor(private httpClien: HttpClient) { }


  getProductList(CategoryId: number): Observable<Product[]>{

    const searchUrl = `${this.baseUrl}/search/findByCategoryId?categoryId=${CategoryId}`

if(CategoryId == 0){
  return this.httpClien.get<GetResponseProducts>(this.baseUrl).pipe(
    map(response => response._embedded.products)
  )
}
    return this.httpClien.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    )

  }
  getProductListPaginate(thePage: number, thePageSize: number , CategoryId:number): Observable<GetResponseProducts>{

    const searchUrl = `${this.baseUrl}/search/findByCategoryId?categoryId=${CategoryId}&page=${thePage}&size=${thePageSize}`
    const allSearchURL  = `${this.baseUrl}?page=${thePage}&size=${thePageSize}`
    if(CategoryId == 0 ){
      return this.httpClien.get<GetResponseProducts>(allSearchURL)
    }
    else{
      return this.httpClien.get<GetResponseProducts>(searchUrl);

    }

  }

  getProductCategories():Observable<ProductCategory[]> {
    return this.httpClien.get<GetResponseProductsCategory>(this.CategoryURL).pipe(
        map(response => response._embedded["product category"]));


  }

  searchProducts(keyWord :string):Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findBynameContaining?name=${keyWord}`;

    return this.httpClien.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products));

  }

  getProduct(theProductId: number) {
    const ProductUrl = `${this.baseUrl}/${theProductId}`;

    return this.httpClien.get<Product>(ProductUrl);


  }
}


interface GetResponseProducts{
  _embedded:{
    products : Product[];
  },
  page:{
    size:number,
    totalElemnets:number,
    totalPages: number,
    number: number
  }
}

interface GetResponseProductsCategory{
  _embedded:{
    "product category" : ProductCategory[];
  }
}
