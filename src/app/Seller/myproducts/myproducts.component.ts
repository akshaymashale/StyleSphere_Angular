import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/Services/product.service';
import { Product } from 'src/app/Models/Product';
import { ImageService } from 'src/app/Services/image.service';

@Component({
  selector: 'app-myproducts',
  templateUrl: './myproducts.component.html',
  styleUrls: ['./myproducts.component.css']
})
export class MyproductsComponent implements OnInit {
  
  products: Product[] = [];
  toFilter: Product[] = [];
  userid: number;
  sortOption: string = ''        // select option to sort products on
  searchQuery: string = '';

  constructor(private activeRoute: ActivatedRoute, private _product: ProductService, private router: Router, private _image : ImageService) { }

  ngOnInit(): void {
    this.loadProductsByUserId();
  }

  // fetch products buy seller id
  loadProductsByUserId(): void {
    this.userid = parseInt(sessionStorage.getItem('userid') || '0',10);
    console.log("UserId from session storage: " + this.userid);
    this._product.getProductsByUserId(this.userid).subscribe(
      data => {
        this.products = data;
        this.toFilter = data;
        console.log("Products loaded: ", this.products);
      },
      error => {
        console.error('Error fetching products', error);
      }
    );
  }

  sortProducts() {
    switch (this.sortOption) {
      case 'LowToHigh':
        this.toFilter.sort((a, b) => a.price - b.price);
        break;
      case 'HighToLow':
        this.toFilter.sort((a, b) => b.price - a.price);
        break;
      case 'AtoZ':
        this.toFilter.sort((a, b) => a.prodName.localeCompare(b.prodName));
        break;
      case 'ZtoA':
        this.toFilter.sort((a, b) => a.prodName.localeCompare(a.prodName));
        break;
    }
  }

  onSearch() {
    this.products = this.products.filter(product =>
      product.prodName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  // show product details
  viewProduct(prodid:number){
    this.router.navigate(['productDetails',prodid])
  }

  // fetch images of products
  getImageUrl(imageName: string): string {
    return this._image.getImageUrl(imageName);
  }
  editProduct(prodid:number){
    this.router.navigate(['productEdit',prodid])
  }
  deleteProduct(prodid:number){
    return this._product.delete(prodid).subscribe();
  }
}
