import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/Models/Cart';
import { Product } from 'src/app/Models/Product';
import { CartService } from 'src/app/Services/cart.service';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-gotocart',
  templateUrl: './gotocart.component.html',
  styleUrls: ['./gotocart.component.css']
})
export class GotocartComponent implements OnInit {
  cartItems: Cart[] = [];
  userid: number;
  productDetails: Map<number, Product> = new Map();

  constructor(
    private cartService: CartService, 
    private router: Router, 
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    const userid = sessionStorage.getItem('userid');
    this.fetchCartItems();

  }

  fetchCartItems(): void {
    // Use the specific user ID to fetch cart items
    this.cartService.getCartByUserId(this.userid).subscribe({
      next: (data: Cart[]) => {
        this.cartItems = data;
        // Fetch product details for each cart item
        this.cartItems.forEach(item => this.fetchProductDetails(item.prodId));
      },
      error: (error) => {
        console.error('Error fetching cart items:', error);
      }
    });
  }

  fetchProductDetails(prodId: number): void {
    if (!this.productDetails.has(prodId)) {
      this.productService.getProductById(prodId).subscribe({
        next: (data: Product) => {
          this.productDetails.set(prodId, data);
        },
        error: (error) => {
          console.error(`Error fetching product details for prodId ${prodId}:`, error);
        }
      });
    }
  }

  removeFromCart(cartid: number): void {
    this.cartService.RemoveFromWishlist(cartid).subscribe({
      next: () => {
        // Remove item from local cart items
        this.cartItems = this.cartItems.filter(item => item.cartId !== cartid);
      },
      error: (error) => {
        console.error('Error removing item from cart:', error);
        // Show user-friendly error message
      }
    });
  }

  buy(prodId: number): void {
    this.router.navigate(['/buy', prodId]);
  }

  // this method is to get the details from map productdetails
  getProductDetails(prodId: number): Product | undefined {
    return this.productDetails.get(prodId);
  }

  increaseQuantity(cartItem: Cart): void {
    const product = this.getProductDetails(cartItem.prodId);
    if (product) {
      cartItem.quantity++;
      cartItem.cart_Amount = cartItem.quantity * product.price;
      this.updateCartItem(cartItem);
    }
  }

  decreaseQuantity(cartItem: Cart): void {
    const product = this.getProductDetails(cartItem.prodId);
    if (product && cartItem.quantity > 1) {
      cartItem.quantity--;
      cartItem.cart_Amount = cartItem.quantity * product.price;
      this.updateCartItem(cartItem);
    }
  }

  updateCartItem(cartItem: Cart): void {
    this.cartService.updateWishlist(cartItem).subscribe({
      next: () => {
        // Optionally refresh cart or update local state
      },
      error: (error) => {
        console.error('Error updating item in cart:', error);
        // Show user-friendly error message
      }
    });
  }
}