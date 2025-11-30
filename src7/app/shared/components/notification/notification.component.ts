import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      *ngIf="show"
      class="notification-container"
      [class]="'alert alert-' + type"
      role="alert"
      [@slideInOut]
    >
      <div class="d-flex align-items-center justify-content-between">
        <div class="message-content">
          <i *ngIf="icon" [class]="'bi ' + getIcon()"></i>
          <strong *ngIf="title" class="me-2">{{ title }}</strong>
          {{ message }}
        </div>
        <button
          *ngIf="dismissible"
          type="button"
          class="btn-close"
          (click)="dismiss()"
          aria-label="Close"
        ></button>
      </div>
    </div>
  `,
  styles: [
    `
      .notification-container {
        margin: 10px 0;
        padding: 1rem;
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .message-content {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      i {
        font-size: 1.2em;
      }

      .btn-close {
        padding: 0.5rem;
        margin: -0.5rem -0.5rem -0.5rem auto;
      }
    `,
  ],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(-10px)', opacity: 0 }),
        animate(
          '200ms ease-out',
          style({ transform: 'translateY(0)', opacity: 1 })
        ),
      ]),
      transition(':leave', [
        animate(
          '200ms ease-in',
          style({ transform: 'translateY(-10px)', opacity: 0 })
        ),
      ]),
    ]),
  ],
})
export class NotificationComponent {
  @Input() type: NotificationType = 'info';
  @Input() message: string = '';
  @Input() title?: string;
  @Input() dismissible: boolean = true;
  @Input() icon: boolean = true;
  @Input() show: boolean = true;
  @Input() duration?: number;

  @Output() closed = new EventEmitter<void>();

  private timeoutId?: number;

  ngOnInit() {
    if (this.duration) {
      this.timeoutId = window.setTimeout(() => {
        this.dismiss();
      }, this.duration);
    }
  }

  ngOnDestroy() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  dismiss() {
    this.show = false;
    this.closed.emit();
  }

  getIcon(): string {
    switch (this.type) {
      case 'success':
        return 'bi-check-circle-fill';
      case 'error':
        return 'bi-x-circle-fill';
      case 'warning':
        return 'bi-exclamation-triangle-fill';
      case 'info':
        return 'bi-info-circle-fill';
      default:
        return 'bi-info-circle-fill';
    }
  }
}
