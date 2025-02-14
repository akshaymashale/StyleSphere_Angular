import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../Models/User';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-userregister',
  templateUrl: './userregister.component.html',
  styleUrls: ['./userregister.component.css']
})
export class UserregisterComponent implements OnInit {
  userForm: FormGroup;
  user: User;

  constructor(private fb: FormBuilder, private service: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      userId: [0],
      userName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.maxLength(10)]],
      status: ['active'],
      userRole: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
    })
  }

  cancel():void{
    this.router.navigate(['home']);
  }
  onSubmit(form:any): void {
    this.userForm=form;
    console.log(this.userForm.value)
    if (this.userForm.valid) {
      const formValues = this.userForm.value;
      this.user = {
        userId:formValues.userId,
        userName: formValues.userName,
        email: formValues.email,
        phoneNumber: formValues.phoneNumber,
        status: "active",
        userRole: formValues.userRole,
        password: formValues.password
      };

      this.service.UserRegistration(this.user).subscribe(
        response => {
          console.log('User Registration successful!', response);
          alert("Register Successfully !!!");
          this.router.navigate(['userLogin']);
        },
        error => {
          console.error('Registration failed', error);
        }
      );
    }
  }
}
