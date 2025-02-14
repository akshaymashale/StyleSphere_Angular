import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from '../Models/LoginModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl: string = 'http://localhost:5145/Authentication/Login';
  constructor(private http: HttpClient) { }

  Login(user: LoginModel):any{  
    return this.http.post<any>(this.apiUrl,user,{observe: 'response'});
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('loginToken');
  }
  getUserRole(): string {
    console.log(sessionStorage.getItem('userrole') );
    
    return sessionStorage.getItem('userrole') || '';
  }
  
}
