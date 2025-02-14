import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PayPalService {
  private baseUrl = 'http://localhost:5145/Payment';

  constructor(private http: HttpClient) { }

  createOrder(amount: number): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/create-order`, amount);
  }

  captureOrder(orderId: string): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/capture-order`, orderId);
  }
}
