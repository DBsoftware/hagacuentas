import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SeoService } from '../../../../core/_services';
import { Store } from '@ngrx/store';
import { AppStore } from '../../../../core/store/store.interface';
import { selectSelected, selectEstadisticas, selectFecha } from '../../../../core/store/presupuestos';
import { filter, map } from 'rxjs/operators';
import { AuxiliarsService } from '../../../../core/_services/auxiliars.service';

@Component({
  selector: 'app-main-presupuesto',
  templateUrl: './main-presupuesto.component.html',
  styleUrls: ['./main-presupuesto.component.scss']
})
export class MainPresupuestoComponent implements OnInit {

  data
  month;
  gastos = 0;
  ingresos = 0;
  balanceData;

  lang = 'CO';

  subscriptionsP;

  constructor(public auxiliars: AuxiliarsService,
    _seo: SeoService,
    private store$: Store<AppStore>,
  ) {
    _seo.addTags('Balance_presupuesto')
    this.data = this.store$.select(selectSelected)
                .pipe(filter(res => res !== null))
    this.lang= localStorage.getItem('country') || 'CO'
    this.month = this.store$.select(selectFecha)
   }

  ngOnInit() {
    this.balanceData = this.store$.select(selectEstadisticas).pipe(filter(e => !!e))
  }
}
