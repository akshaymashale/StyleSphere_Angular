import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserloginComponent } from './User/userlogin/userlogin.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { UserregisterComponent } from './User/userregister/userregister.component';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductaddComponent } from './Seller/productadd/productadd.component';
import { HomeComponent } from './home/home.component';
import { ProdlistComponent } from './Customer/prodlist/prodlist.component';
import { UserdetailsComponent } from './User/userdetails/userdetails.component';
import { SellerdashboardComponent } from './Seller/sellerdashboard/sellerdashboard.component';
import { ProducteditComponent } from './Seller/productedit/productedit.component';
import { UsereditComponent } from './User/useredit/useredit.component';
import { MyproductsComponent } from './Seller/myproducts/myproducts.component';
import { ProductbuyComponent } from './Customer/productbuy/productbuy.component';
import { ProductdetailsComponent } from './Seller/productdetails/productdetails.component';
import { GotocartComponent } from './Customer/gotocart/gotocart.component';
import { OrderDetailsComponent } from './Seller/order-details/order-details.component';
import { SellerGuard } from './guards/isseller.guard';
import { CustomerGuard } from './guards/iscustomer.guard';
import { authGuard } from './guards/auth.guard';
import { OrdersComponent } from './Customer/orders/orders.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'app',component:AppComponent},
  {path:'navbar',component:NavbarComponent},
  {path:'userDetails/:id',component:UserdetailsComponent},
  {path:"userLogin",component:UserloginComponent},
  {path:"userRegister",component:UserregisterComponent},
  {path:"userEdit/:userid",component:UsereditComponent},
  {path:"productadd",component:ProductaddComponent,canActivate:[authGuard,SellerGuard]},
  {path:"productList",component:ProdlistComponent},
  {path:"productEdit/:prodid",component:ProducteditComponent,canActivate:[authGuard,SellerGuard]},
  {path:"productDetails/:prodid",component:ProductdetailsComponent},
  {path:"myproducts",component:MyproductsComponent,canActivate:[authGuard,SellerGuard]},
  {path:"sellerDashboard",component:SellerdashboardComponent,canActivate:[authGuard,SellerGuard]},
  {path:"buy/:prodid",component:ProductbuyComponent,canActivate:[authGuard,CustomerGuard]},
  {path:"gotocart/:userid",component:GotocartComponent,canActivate:[authGuard,CustomerGuard]},
  {path:"orders/:userid",component:OrdersComponent,canActivate:[authGuard,CustomerGuard]},
  {path:"orderDetails",component:OrderDetailsComponent},
  {path:"**",component:PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
