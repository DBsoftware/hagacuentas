import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { SeoService } from '../../../../../core/_services';
import { AuxiliarsService } from '../../../../../core/_services/auxiliars.service';
import { Store } from '@ngrx/store';
import { AppStore } from '../../../../../core/store/store.interface';
import { tap } from 'rxjs/operators';
import { selectFecha } from '../../../../../core/store/presupuestos';
import { takeUntilDestroy } from 'take-until-destroy';

@Component({
  selector: 'app-comparar',
  templateUrl: './comparar.component.html',
  styleUrls: ['./comparar.component.scss']
})
export class CompararComponent implements OnDestroy {
  fecha
  mes
  anio
  activeTable
  constructor( _seo: SeoService, 
              private store$: Store<AppStore>,
             public auxiliars: AuxiliarsService ) {
    _seo.addTags('Estadísticasc_comparar')
    this.store$.select(selectFecha).pipe(tap(fecha => this.fecha = fecha), 
    tap(fecha => this.mes = new Date(this.fecha).getMonth()),
    takeUntilDestroy(this))
    .subscribe()
  }

  ngOnDestroy() {}


}
