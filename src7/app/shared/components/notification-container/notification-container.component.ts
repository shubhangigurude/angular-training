import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';
import { NotificationComponent } from '../notification/notification.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notification-container',
  standalone: true,
  imports: [CommonModule, NotificationComponent],
  template: `
    <app-notification
      *ngIf="notification"
      [type]="notification.type"
      [message]="notification.message"
      [title]="notification.title"
      [dismissible]="notification.dismissible"
      [duration]="notification.duration"
      (closed)="onNotificationClosed()"
    ></app-notification>
  `,
  styles: [
    `
      :host {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1050;
        min-width: 300px;
      }
    `,
  ],
})
export class NotificationContainerComponent implements OnInit, OnDestroy {
  notification: any;
  private subscription?: Subscription;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.subscription = this.notificationService.notification$.subscribe(
      (notification) => {
        this.notification = notification;
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onNotificationClosed() {
    this.notificationService.clear();
  }
}
