import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/Models/Cart';
import { Product } from 'src/app/Models/Product';
import { CartService } from 'src/app/Services/cart.service';
import { ImageService } from 'src/app/Services/image.service';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-prodlist',
  templateUrl: './prodlist.component.html',
  styleUrls: ['./prodlist.component.css']
})
export class ProdlistComponent {
  products: Product[] = [];       // productlist to display all product
  toFilter: Product[] = [];       // stores temporary product list to apply sorting and searching on list
  userid: number;
  role: string;
  wishlistItem: Cart;             // stores items in wishlist
  wishlistProducts: Set<number> = new Set(); // Store product IDs that are in wishlist
  sortOption: string = ''        // select option to sort products on
  searchQuery: string = '';      // Takes input for search
  loginStatus:any

  constructor(
    private _product: ProductService,
    private _cart: CartService,
    private _image: ImageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userid = parseInt(sessionStorage.getItem('userid') || '0', 10);
    localStorage.getItem("logged");
    this.role = localStorage.getItem('role') || 'customer';
    this.loadProducts();
  }

  private loadProducts() {
    this._product.getAllProducts().subscribe(data => {
      this.products = data;
      this.toFilter = data;
      // Check wishlist status for each product
      this.products.forEach(product => {
        this.checkWishlistStatus(product.prodId);
      });
    });
  }

    // to fetch images 
  getImageUrl(imageName: string): string {
    return this._image.getImageUrl(imageName);
  }

  // for sorting the product based on select option
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

  private checkWishlistStatus(prodId: number) {
    this._cart.ProductInWishList(prodId, this.userid).subscribe(
      existingItem => {
        if (existingItem) {
          this.wishlistProducts.add(prodId);      // adds prodid to wishlistProducts set if it is present in wihslist
        }
      }
    );
  }

  // to check if product is present in wishlist or not
    // => set wishlistProducts contains all the prodid of products present in wishlist
  isInWishlist(prodId: number): boolean {
    return this.wishlistProducts.has(prodId);
  }

  // Product Details
  showDetails(prodid: number): void {
    this.router.navigate(['/productDetails', prodid]);
  }

    // to add product to wishlist
  addToWishlist(prodid: number): void {
      this._cart.ProductInWishList(prodid, this.userid).subscribe(existingCartItem => {
        if (existingCartItem) {
          // Product already exists in wishlist, update quantity and amount
          const product = this.products.find(p => p.prodId === prodid);
          if (product) {
            this.wishlistItem = {
              ...existingCartItem,
              quantity: existingCartItem.quantity + 1,
              cart_Amount: existingCartItem.cart_Amount + product.price
            };
            this._cart.updateWishlist(this.wishlistItem).subscribe(
              data => {
                alert('Product quantity updated in wishlist');
                this.wishlistProducts.add(prodid);
              },
              error => {
                console.error('Error updating product in wishlist:', error);
                alert('Failed to update product in wishlist. Please try again.');
              }
            );
          }
        } else {
          // Product does not exist in wishlist, add new item
          const product = this.products.find(p => p.prodId === prodid);
          if (product) {
            this.wishlistItem = {
              cartId: 0,
              userId: this.userid,
              prodId: prodid,
              quantity: 1,
              cart_Amount: product.price
            };
            this._cart.AddtoWishlist(this.wishlistItem).subscribe(
              response => {
                console.log('Product added to wishlist:', response);
                // alert('Product added to wishlist!');
                this.wishlistProducts.add(prodid);
              },
              error => {
                console.error('Error adding product to wishlist:', error);
                alert('Failed to add product to wishlist. Please try again.');
              }
            );
          }
        }

      });
    }
    
    // to search product
  onSearch() {
    this.products = this.products.filter(product =>
      product.prodName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  // proceed to buy product
  buy(prodid: number): void {
      alert("Proceed to buy");
      this.router.navigate(['/buy', prodid]);
    }
}