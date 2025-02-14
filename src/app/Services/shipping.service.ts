import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Shipping_Details } from '../Models/Shpping_Details';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {
  apiUrl: string = 'http://localhost:5145/Shipping'; 
  httpOptions = { headers: new HttpHeaders({ 'Content-type': 'application/json' })}; 
  constructor(private http: HttpClient) {} 
  
  addShippingDetails(shippingDetails: Shipping_Details): Observable<any> { 
    return this.http.post<any>(this.apiUrl, shippingDetails, this.httpOptions).pipe(catchError(this.handleError)); 
  } 
  
  private handleError(error: any): Observable<never> 
  { let errorMessage = error.status + '\n' + error.statusText + '\n' + error.error; 
    alert(errorMessage); return throwError(errorMessage); 
  }
}
