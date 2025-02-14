import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cart } from '../Models/Cart';
import { catchError, map, Observable, throwError } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  apiUrl: string = 'http://localhost:5145/Cart';

  httpOptions = { headers: new HttpHeaders({ 'Content-type': 'application/json' }) };

  constructor(private http: HttpClient) { }

  AddtoWishlist(wishlistItem: Cart): Observable<any> {
    console.log("Adding to wishlist: ", wishlistItem);
    return this.http.post<any>(this.apiUrl, wishlistItem, this.httpOptions).pipe(catchError(this.handleError));
  }

  ProductInWishList(prodid: number, userId: number): Observable<Cart | null> {
    return this.http.get<Cart[]>(`${this.apiUrl}?userId=${userId}`).pipe(
      map(carts => carts.find(cart => cart.prodId === prodid) || null),
      catchError(this.handleError)
    );
  }

  updateWishlist(wishlistItem: Cart): Observable<any> {
    console.log("Updating wishlist: ", wishlistItem);
    return this.http.put(`${this.apiUrl}/${wishlistItem.cartId}`, wishlistItem, this.httpOptions).pipe(catchError(this.handleError));
  }

  RemoveFromWishlist(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  getCartByProdId(prodid:number,userId:number):Observable<any>{
    userId=parseInt(sessionStorage.getItem('userid')  || '0',  10);
    return this.http.get<any>(`${this.apiUrl}/Product/${userId}?prodid=${prodid}`);
  }
  getCartByUserId(userId: number): Observable<Cart[]> { 
    return this.http.get<Cart[]>(`${this.apiUrl}?userId=${userId}`).pipe(catchError(this.handleError)); 
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = `${error.status}\n${error.statusText}\n${error.error}`;
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
