import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/Models/Product';
import { ImageService } from 'src/app/Services/image.service';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent {
product:Product;
prodId:number;
role: string;
wishlistProducts: Set<number> = new Set(); 

constructor(private _product:ProductService,private _image:ImageService, private router:Router,private activeRoute:ActivatedRoute) {}
ngOnInit(){
  this.role = localStorage.getItem('role') || 'customer';
  this.prodId = parseInt(this.activeRoute.snapshot.paramMap.get('prodid') || '0',10);
  this._product.getProductById(this.prodId).subscribe(data => {
    this.product = data;
    console.log(this.product);
  });
}

getImageUrl(imageName: string): string {
  return this._image.getImageUrl(imageName);
}

buy(prodid:number):void{
  this.prodId = prodid;
  alert("Proceed to buy");    
  console.log("prodid"+prodid);
  console.log("prodId"+this.prodId);
  // this.router.navigate(['/buy/{prodid}']);
  this.router.navigate(['/buy',this.prodId]);
}

}
