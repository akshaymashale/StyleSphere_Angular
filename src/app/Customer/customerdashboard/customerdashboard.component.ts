import { Component } from '@angular/core';

@Component({
  selector: 'app-customerdashboard',
  templateUrl: './customerdashboard.component.html',
  styleUrls: ['./customerdashboard.component.css']
})
export class CustomerdashboardComponent {
  role:string
  userid:number
  ngOnInit(){
    this.role = localStorage.getItem('userrole') || '';
    this.userid = parseInt(sessionStorage.getItem('userid') || '0',10)
  }
}
