import { Component } from '@angular/core';
import { Product } from 'src/app/Models/Product';
import { User } from 'src/app/Models/User';
import { ProductService } from 'src/app/Services/product.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-sellerdashboard',
  templateUrl: './sellerdashboard.component.html',
  styleUrls: ['./sellerdashboard.component.css']
})
export class SellerdashboardComponent {
  userid:number;
  products:Product[]
  constructor(private _user:UserService,private _product:ProductService){}
  ngOnInit(){
    this.userid = parseInt(sessionStorage.getItem('userid') || '0', 10);
  }
  
  fetchSellerProducts(){
    this._product.getProductsByUserId(this.userid).subscribe(data => {
      this.products = data;
    })
  }
}
