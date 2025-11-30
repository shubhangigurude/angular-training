import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface PopupConfig {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  showConfirmButton?: boolean;
  confirmButtonText?: string;
  showCancelButton?: boolean;
  cancelButtonText?: string;
}

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  private popupSubject = new BehaviorSubject<PopupConfig | null>(null);
  popup$ = this.popupSubject.asObservable();

  private resolveCallback?: (value: boolean) => void;

  show(config: PopupConfig): Promise<boolean> {
    console.log('Showing popup:', config);
    this.popupSubject.next(config);
    return new Promise((resolve) => {
      this.resolveCallback = resolve;
    });
  }

  success(message: string, title: string = 'Success'): Promise<boolean> {
    return this.show({
      type: 'success',
      title,
      message,
      showConfirmButton: true,
      confirmButtonText: 'OK',
    });
  }

  error(message: string, title: string = 'Error'): Promise<boolean> {
    return this.show({
      type: 'error',
      title,
      message,
      showConfirmButton: true,
      confirmButtonText: 'OK',
    });
  }

  warning(message: string, title: string = 'Warning'): Promise<boolean> {
    return this.show({
      type: 'warning',
      title,
      message,
      showConfirmButton: true,
      confirmButtonText: 'OK',
    });
  }

  info(message: string, title: string = 'Information'): Promise<boolean> {
    return this.show({
      type: 'info',
      title,
      message,
      showConfirmButton: true,
      confirmButtonText: 'OK',
    });
  }

  confirm(message: string, title: string = 'Confirm'): Promise<boolean> {
    return this.show({
      type: 'warning',
      title,
      message,
      showConfirmButton: true,
      confirmButtonText: 'Yes',
      showCancelButton: true,
      cancelButtonText: 'No',
    });
  }

  close(result: boolean = false) {
    this.popupSubject.next(null);
    if (this.resolveCallback) {
      this.resolveCallback(result);
      this.resolveCallback = undefined;
    }
  }
}
