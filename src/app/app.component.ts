import { Component, OnInit, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AppStore } from './core/store/store.interface';
import { Store } from '@ngrx/store';
import { actions } from './core/store/presupuestos';
import { LocationService } from './core/_services';
import { take } from 'rxjs/operators';
import { AuxiliarsService } from './core/_services/auxiliars.service';
import { ToastService } from './core/_services/toast.service';
import { takeUntilDestroy } from 'take-until-destroy';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private store$: Store<AppStore>,
    private auxiliars: AuxiliarsService,
    private location: LocationService,
    public toastService: ToastService
  ) {
    if ( localStorage.getItem('presupuestoSelected') ) 
      this.store$.dispatch(actions.selectPresupuesto({presupuestoId:localStorage.getItem('presupuestoSelected')}));
    if (!localStorage.getItem('country'))
        location.getCodeFromApi()
        .pipe(take(1))
        .subscribe(e => localStorage.setItem('country', this.auxiliars.correctCountryCode(e)))
    if (isPlatformBrowser(this.platformId)) {
      $(document).on('contextmenu', 'img', function () {
        return false;
      })
    }
  }

  ngOnInit() {
    this.toastService.getTotastSubject()
    .pipe(takeUntilDestroy(this))
    .subscribe(e => this.showNotification(e))
  }
  showNotification(message) {
    this.toastService.show(message, { classname: 'bg-danger text-light', delay: 2000 });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    
  }

}
