import { Injectable, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: any[] = [];
  toastSubject = new Subject<string>()

  getTotastSubject(){
      return this.toastSubject.asObservable()
  }

  sendNotification(notification){
      this.toastSubject.next(notification)
  }
  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options, id: this.toasts.length });
  }

  remove(toast) {
    this.toasts = this.toasts.filter(t => t.id !== toast.id);
  }
}