import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserloginComponent } from './User/userlogin/userlogin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AuthInterceptor } from './auth.interceptor';
import { UserregisterComponent } from './User/userregister/userregister.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductaddComponent } from './Seller/productadd/productadd.component';
import { ProdlistComponent } from './Customer/prodlist/prodlist.component';
import { HomeComponent } from './home/home.component';
import { XsrfInterceptor } from './xsrf.interceptor';
import { UserdetailsComponent } from './User/userdetails/userdetails.component';
import { SellerdashboardComponent } from './Seller/sellerdashboard/sellerdashboard.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { UsereditComponent } from './User/useredit/useredit.component';
import { ProducteditComponent } from './Seller/productedit/productedit.component';
import { ProductdeleteComponent } from './Seller/productdelete/productdelete.component';
import { MyproductsComponent } from './Seller/myproducts/myproducts.component';
import { ProductdetailsComponent } from './Seller/productdetails/productdetails.component';
import { ProductbuyComponent } from './Customer/productbuy/productbuy.component';
import { GotocartComponent } from './Customer/gotocart/gotocart.component';
import { OrderDetailsComponent } from './Seller/order-details/order-details.component';
import { CustomerdashboardComponent } from './Customer/customerdashboard/customerdashboard.component';
import { OrdersComponent } from './Customer/orders/orders.component';
import { AlertComponent } from './alert/alert.component';
import { AlertService } from './Services/alert.service';
import { FashionCarouselComponent } from './fashion-carousel/fashion-carousel.component';

@NgModule({
  declarations: [
    AppComponent,
    UserloginComponent,
    PagenotfoundComponent,
    UserregisterComponent,
    NavbarComponent,
    ProductaddComponent,
    ProdlistComponent,
    HomeComponent,
    UserdetailsComponent,
    SellerdashboardComponent,
    LandingpageComponent,
    ProducteditComponent,
    UsereditComponent,
    ProductdeleteComponent,
    MyproductsComponent,
    ProductdetailsComponent,
    ProductbuyComponent,
    GotocartComponent,
    OrderDetailsComponent,
    CustomerdashboardComponent,
    OrdersComponent,
    AlertComponent,
    FashionCarouselComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],

  providers: [
    // Interceptor Registration 
    { 
      provide:HTTP_INTERCEPTORS,    // interceptor is provided using the HTTP_INTERCEPTORS injection token.
      useClass : AuthInterceptor,
      multi: true                   // allows multiple interceptors to be registered.
      },
      { 
        provide:HTTP_INTERCEPTORS,    // interceptor is provided using the HTTP_INTERCEPTORS injection token.
        useClass : XsrfInterceptor,
        multi: true                   // allows multiple interceptors to be registered.
        },
        [AlertService]
      
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
