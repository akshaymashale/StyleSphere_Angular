import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../Models/Order';
import { catchError, Observable, throwError } from 'rxjs';
import { OrderDetails } from '../Models/OrderDetails';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  apiUrl: string = 'http://localhost:5145/Order'; 
  httpOptions = { headers: new HttpHeaders({ 'Content-type': 'application/json' }) };

  constructor(private http: HttpClient, private activeRoute: ActivatedRoute) { }

  // Add Order
  addOrder(order: Order): Observable<any> {
    console.log("Order: " + order);
    order.userId = parseInt(sessionStorage.getItem('userid') || '0',10);
    console.log("order service: ", order.userId);
    
    return this.http.post<any>(this.apiUrl, order);
  }

  // Get All Orders
  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  // Get orders by sellerId
  getOrdersBySellerId(sellerid:number):Observable<Order[]>{
    return this.http.get<Order[]>(`${this.apiUrl}/seller/${sellerid}`)
  }

  // Get Order By ID
  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Get Complete OrderDetails by orderId
  getOrderDetails(userid:number,orderid: number): Observable<OrderDetails[]> { // Return array
    return this.http.get<OrderDetails[]>(`${this.apiUrl}/orderProduct/${userid}/${orderid}`);
  }
  // Get Orders By User ID
  getOrdersByUserId(userid: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/customer/${userid}`)
      .pipe(catchError(this.handleError));
  }

  // Update Order
  updateOrder(orderid: number, order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.apiUrl}/${orderid}`, order, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // Delete Order
  deleteOrder(orderid: number): Observable<Order> {
    return this.http.delete<Order>(`${this.apiUrl}/${orderid}`)
      .pipe(catchError(this.handleError));
  }

  // Error Handling
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage: string;
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server-side error: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    alert(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
