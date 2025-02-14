import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Models/User';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-useredit',
  templateUrl: './useredit.component.html',
  styleUrls: ['./useredit.component.css']
})
export class UsereditComponent implements OnInit {
  user: User;
  userid: number;

  constructor(private service: UserService, private activeRoute: ActivatedRoute, private route: Router) { }

  ngOnInit() {
    this.userid = parseInt(localStorage.getItem('userid') || '0',10);  
    console.log("UserId = " + this.userid);
    this.service.getUserById(this.userid).subscribe(data => {
      this.user = data;
      console.log(this.user);
    })
  }

  onSubmit() {
    this.service.updateUser(this.userid, this.user).subscribe(data => {
      alert("User data updated!");
      this.route.navigate(['/userDetails',this.userid]);
    },
      error => alert(error.errorMessage)
    );
  }
}
