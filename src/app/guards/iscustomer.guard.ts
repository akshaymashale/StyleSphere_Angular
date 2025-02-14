import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerGuard {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    const userRole = this.authService.getUserRole();
    if (this.authService.isLoggedIn() && userRole === 'customer') {
      return true;
    } else {
      this.router.navigate(['/unauthorized']);
      return false;
    }
  }
}
