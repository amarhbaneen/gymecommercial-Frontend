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

  getProductCategories():Observable<ProductCategory[]> {
      return this.httpClien.get<GetResponseProductsCategory>(this.CategoryURL).pipe(
        map(response => response._embedded.product_category));


  }
}


interface GetResponseProducts{
  _embedded:{
    products : Product[];
  }
}

interface GetResponseProductsCategory{
  _embedded:{
    product_category : ProductCategory[];
  }
}
