import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()

// Interceptor ==> - Tools for handling and manipulating HTTP requests and responses.
                // - They allow you to define custom logic that can be executed before the request is sent to the server or after the response is received.
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  // intercept method is called for every HTTP request.
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const token = sessionStorage.getItem('loginToken');       // Get JWT from sessionStorage

    // request object is immutable hence we create clone it to modify it
    if(token){
      request = request.clone({
        setHeaders:{Authorization:`Bearer ${token}`}
      })
    }
    return next.handle(request);    // passing cloned request with token to the next handler
  }
}
