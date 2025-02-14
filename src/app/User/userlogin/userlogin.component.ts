import { Component } from '@angular/core';
import { User } from '../../Models/User';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/Services/alert.service';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent {
  currentuser: User = {
    userId: 0,
    userName: '',
    email: '',
    password: '',
    phoneNumber: '',
    status: '',
    userRole: ''
  }
  passwordFieldType: string;

  constructor(
    private _service: AuthService, 
    private router: Router,
    private alertService: AlertService
  ) {}

  isLoggedin: string = 'true';
  Role: string = '';

  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
}

  onSubmit(form: any) {
    let loginuser = form.value;
    this._service.Login(loginuser).subscribe({
      next: (res: any) => {
        if (res.status == 200) {
          // localstorage ==> to hold unencrypted data
        localStorage.setItem('logged', this.isLoggedin);  // Stores the login status in local storage.

        console.log("UserLogin Component: Token ===> ");
        console.log(res.body.token);
        // sessionStorage ==> to hold encrypted data
        sessionStorage.setItem('loginToken', res.body.token);  // Stores the token in session storage

        console.log("UserLogin Component: userid ===>");
        console.log(res.body.userId);
        sessionStorage.setItem('userid',res.body.userId);
        
        sessionStorage.setItem('userrole', res.body.userRole);
        console.log(res.body);
        
        this.Role = sessionStorage.getItem("userrole") || '';
          window.dispatchEvent(new Event('storage'));
          
          if (this.Role) {
            this.alertService.showAlert('success', 'Login successful! Welcome back.');
            this.router.navigate(['/home']);
          } else {
            this.alertService.showAlert('error', 'Error logging in. Please try again.');
          }
        }
      },
      error: (err: any) => {
        this.alertService.showAlert('error', 'Login failed: ' + (err.message || 'Please try again'));
      }
    });
  }
}