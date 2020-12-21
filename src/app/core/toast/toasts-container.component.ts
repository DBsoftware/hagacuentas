import {Component, TemplateRef} from '@angular/core';

import {ToastService} from '../_services/toast.service';


@Component({
  selector: 'app-toasts',
  template: `
    <ngb-toast
      *ngFor="let toast of toastService.toasts"
      [class]="toast.classname"
      [autohide]="true"
      [delay]="toast.delay || 5000"
      (hide)="toastService.remove(toast)">
      <div class="div-load row w-100 mx-0 position-relative justify-content-between" >
        <ng-template [ngIf]="isTemplate(toast)" [ngIfElse]="text">
          <ng-template [ngTemplateOutlet]="toast.textOrTpl"></ng-template>
        </ng-template>
        <ng-template #text>
        <div class="col-12 mt-2 text-center">
          <span style="word-wrap: break-word;">{{ toast.textOrTpl }}</span>
        </div>
        </ng-template>
      </div>
    </ngb-toast>
  `,
  styles:[`

  .div-load:before {
    z-index: 999;
  }

  ::ng-deep .ngb-toasts{
    top: 4em !important;
    right: -0.6em !important;
  }

  ::ng-deep .toast.show{
    border-radius: 1em 0 0em 1em;
  }

  `],
  host: {'[class.ngb-toasts]': 'true'}
})
export class ToastsContainer {
  constructor(public toastService: ToastService) {}

  isTemplate(toast) { return toast.textOrTpl instanceof TemplateRef; }
}
