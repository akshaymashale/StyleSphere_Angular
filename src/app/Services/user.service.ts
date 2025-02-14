import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Models/User';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl : string =  'http://localhost:5145/User';

  httpOptions = {headers: new HttpHeaders({'Content-type':'application/json'})};
  
  constructor(private http:HttpClient) { }

  UserRegistration(user:User):Observable<any>{
    console.log("uer"+user);
    return this.http.post<any>(this.apiUrl,user,this.httpOptions).pipe(catchError(this.handleError));
  }

  getAllUsers():Observable<User>{
    return this.http.get<User>(this.apiUrl);
  }

  updateUser(id:number,user:User):Observable<User>{
    return this.http.put<User>(this.apiUrl+"/"+id,user,this.httpOptions).pipe(catchError(this.handleError));
  }
  getUserById(id:number):Observable<User>{
    console.log("From user.service.ts ==> " + id);
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }
  handleError(error:HttpErrorResponse){
    let errorMessage="";
    errorMessage=error.status +'\n'+error.statusText+'\n'+error.error;
    alert(errorMessage);
    return throwError(errorMessage);
  }
}
