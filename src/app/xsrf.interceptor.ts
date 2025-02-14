import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class XsrfInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.getXsrfToken();

    // Ensure token is not undefined before calling toLowerCase()
    if (token) {
      const clonedRequest = req.clone({
        headers: req.headers.set('X-XSRF-TOKEN', token.toLowerCase())
      });
      return next.handle(clonedRequest);
    }

    return next.handle(req);
  }

  private getXsrfToken(): string | null {
    // Your logic to get XSRF token, ensure it never returns undefined
    const tokenMatch = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
    return tokenMatch ? tokenMatch[1] : null;
  }
}
