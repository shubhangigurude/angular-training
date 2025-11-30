import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupService } from '../../services/popup.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="show" class="modal-backdrop fade show"></div>
    <div *ngIf="show" class="modal fade show d-block" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header" [ngClass]="headerClass">
            <h5 class="modal-title">{{ config?.title }}</h5>
            <button
              type="button"
              class="btn-close"
              (click)="onCancel()"
            ></button>
          </div>
          <div class="modal-body">
            <div class="text-center mb-3">
              <i [class]="iconClass" style="font-size: 3rem;"></i>
            </div>
            <p class="text-center">{{ config?.message }}</p>
          </div>
          <div class="modal-footer">
            <button
              *ngIf="config?.showCancelButton"
              type="button"
              class="btn btn-secondary"
              (click)="onCancel()"
            >
              {{ config?.cancelButtonText || 'Cancel' }}
            </button>
            <button
              *ngIf="config?.showConfirmButton"
              type="button"
              class="btn"
              [ngClass]="buttonClass"
              (click)="onConfirm()"
            >
              {{ config?.confirmButtonText || 'OK' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: contents;
      }
      .modal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 1040;
      }
      .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 1050;
        display: flex !important;
        align-items: center;
        justify-content: center;
      }
      .icon-success {
        color: #198754;
      }
      .icon-error {
        color: #dc3545;
      }
      .icon-warning {
        color: #ffc107;
      }
      .icon-info {
        color: #0dcaf0;
      }
      .header-success {
        background-color: #d1e7dd;
      }
      .header-error {
        background-color: #f8d7da;
      }
      .header-warning {
        background-color: #fff3cd;
      }
      .header-info {
        background-color: #cff4fc;
      }
    `,
  ],
})
export class PopupComponent implements OnInit, OnDestroy {
  show = false;
  config: any = null;
  private subscription?: Subscription;

  constructor(private popupService: PopupService) {}

  ngOnInit() {
    console.log('PopupComponent initialized');
    this.subscription = this.popupService.popup$.subscribe((config) => {
      console.log('Received popup config:', config);
      this.config = config;
      this.show = !!config;
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  get headerClass(): string {
    return this.config ? `header-${this.config.type}` : '';
  }

  get buttonClass(): string {
    const typeMap: { [key: string]: string } = {
      success: 'btn-success',
      error: 'btn-danger',
      warning: 'btn-warning',
      info: 'btn-info',
    };
    return this.config
      ? typeMap[this.config.type] || 'btn-primary'
      : 'btn-primary';
  }

  get iconClass(): string {
    const typeMap: { [key: string]: string } = {
      success: 'bi bi-check-circle icon-success',
      error: 'bi bi-x-circle icon-error',
      warning: 'bi bi-exclamation-triangle icon-warning',
      info: 'bi bi-info-circle icon-info',
    };
    return this.config
      ? typeMap[this.config.type] || 'bi bi-info-circle'
      : 'bi bi-info-circle';
  }

  onConfirm() {
    this.popupService.close(true);
  }

  onCancel() {
    this.popupService.close(false);
  }
}
