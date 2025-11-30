import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NotificationType } from '../components/notification/notification.component';

export interface NotificationConfig {
  type: NotificationType;
  message: string;
  title?: string;
  duration?: number;
  dismissible?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationSubject = new BehaviorSubject<NotificationConfig | null>(
    null
  );
  notification$: Observable<NotificationConfig | null> =
    this.notificationSubject.asObservable();

  show(config: NotificationConfig) {
    this.notificationSubject.next({
      dismissible: true,
      duration: 5000,
      ...config,
    });
  }

  success(message: string, title?: string) {
    this.show({
      type: 'success',
      message,
      title,
    });
  }

  error(message: string, title?: string) {
    this.show({
      type: 'error',
      message,
      title,
    });
  }

  warning(message: string, title?: string) {
    this.show({
      type: 'warning',
      message,
      title,
    });
  }

  info(message: string, title?: string) {
    this.show({
      type: 'info',
      message,
      title,
    });
  }

  clear() {
    this.notificationSubject.next(null);
  }
}
