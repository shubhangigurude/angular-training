import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="loading-container" [class.overlay]="overlay">
      <div class="spinner-container">
        <div
          class="spinner-border"
          [class]="size ? 'spinner-border-' + size : ''"
          [class.text-light]="overlay"
          role="status"
        >
          <span class="visually-hidden">Loading...</span>
        </div>
        <p
          *ngIf="message"
          [class.text-light]="overlay"
          class="mt-2 loading-text"
        >
          {{ message }}
        </p>
      </div>
    </div>
  `,
  styles: [
    `
      .loading-container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 50px;
      }

      .loading-container.overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 9999;
      }

      .spinner-container {
        text-align: center;
      }

      .loading-text {
        font-size: 14px;
        margin: 0;
      }
    `,
  ],
})
export class LoadingComponent {
  @Input() message?: string;
  @Input() size?: 'sm' | 'lg';
  @Input() overlay: boolean = false;
}
