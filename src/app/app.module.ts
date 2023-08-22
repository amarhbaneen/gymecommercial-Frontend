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
const routes: Routes =[
  {path : 'product/:id' , component: ProductDetailsComponent},
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

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
