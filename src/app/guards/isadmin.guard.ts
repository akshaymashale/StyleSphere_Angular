import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

export const isadminGuard: CanActivateFn = (route, state) => {
const authService=inject(AuthService);
const router=inject(Router);
 const userRole = authService.getUserRole();
 console.log("userrole"+userRole);
 
    if (authService.isLoggedIn() && userRole === 'admin') {
      return true;
    } else {
      router.navigate(['/unauthorized']);
      return false;
    }
};
