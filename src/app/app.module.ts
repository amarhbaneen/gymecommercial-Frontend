import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductCategoryMenuComponent } from './product-category-menu/product-category-menu.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NgxPaginationModule} from "ngx-pagination";
import { CartStatusComponent } from './cart-status/cart-status.component';


import { CartDetailsComponent } from './cart-details/cart-details.component';
import { CheckoutComponent } from './checkout/checkout.component';
import {ReactiveFormsModule} from "@angular/forms";

const routes: Routes =[
  {path : 'checkout' , component:CheckoutComponent},
  {path : 'product/:id' , component: ProductDetailsComponent},
  {path : 'cart-details' , component: CartDetailsComponent},
  {path : 'search/:keyword' , component: ProductListComponent},
  {path : 'category/:id/:name' , component: ProductListComponent},
  {path : 'products' , component: ProductListComponent},
  {path : 'category' , component: ProductListComponent},
  {path : '' , redirectTo : '/products' , pathMatch: 'full'},
  {path : '**' , component: PageNotFoundComponent}
]
@NgModule({
  declarations: [

    AppComponent,
    ProductListComponent,
    PageNotFoundComponent,
    ProductCategoryMenuComponent,
    SearchBarComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    NgbModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ],
  providers: [
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
