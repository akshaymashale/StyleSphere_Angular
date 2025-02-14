import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  role: string | null = '';
  loggedIn: boolean = false;
  ngOnInit(): void {
    this.updateLoginStatus();

    // Listen to changes in sessionStorage and localStorage
    window.addEventListener('storage', () => {
      this.updateLoginStatus();
    });
  }

  updateLoginStatus(): void {
    this.role = sessionStorage.getItem("userrole");
    this.loggedIn = localStorage.getItem("logged") === 'true';

    console.log(this.role);
    console.log(this.loggedIn);
    
    
  }
}
