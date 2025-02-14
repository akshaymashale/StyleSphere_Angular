import { Component, OnDestroy, OnInit } from '@angular/core';
import { Alert, AlertService } from '../Services/alert.service';
import { Subscription } from 'rxjs';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class AlertComponent implements OnInit, OnDestroy {
  alert: Alert | null = null;
  private subscription: Subscription = new Subscription();
  private timeout: any;

  constructor(private alertService: AlertService) {}

  ngOnInit() {
    this.subscription = this.alertService.alert$.subscribe(alert => {
      this.showAlert(alert);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  private showAlert(alert: Alert) {
    this.alert = alert;
    this.timeout = setTimeout(() => {
      this.closeAlert();
    }, 5000);
  }

  closeAlert() {
    this.alert = null;
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }
}

