import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CartService } from '../Services/cart.service';
import { Cart } from '../Models/Cart';
import { Observable } from 'rxjs';
import { User } from '../Models/User';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  title = 'StyleSphere_Angular';
  role: string | null = '';
  loggedIn: boolean = false;
  userid: number;
  cartItems: Cart[] = [];

  constructor(private _cart: CartService,private _user:UserService, private router: Router) {}
  user:User

  ngOnInit(): void {
    this.updateLoginStatus();

    // Listen to changes in sessionStorage and localStorage
    window.addEventListener('storage', () => {
      this.updateLoginStatus();
    });

    this.userid = parseInt(sessionStorage.getItem('userid') || '0', 10);

    this._user.getUserById(this.userid).subscribe(data => {
      this.user = data;
    });

  }

  updateLoginStatus(): void {
    this.role = sessionStorage.getItem("userrole");
    this.loggedIn = localStorage.getItem("logged") === 'true';
    this.userid = parseInt(sessionStorage.getItem('userid') || '0', 10);
    if (this.loggedIn) {
      this.fetchCartItems();
    }
  }

  fetchCartItems(): void {
    this.router.navigate(['/gotocart', this.userid])
  }

  logout(): void {
    sessionStorage.clear();
    localStorage.clear();
    console.log("sessionStorage has been cleared =========================");
    this.updateLoginStatus();
    this.router.navigate(['userLogin']);
  }
}
