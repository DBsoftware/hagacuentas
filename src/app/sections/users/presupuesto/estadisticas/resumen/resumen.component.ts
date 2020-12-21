import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SeoService } from '../../../../../core/_services';
import { AppStore } from '../../../../../core/store/store.interface';
import { selectEstadisticas } from '../../../../../core/store/presupuestos';
import { filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.scss']
})
export class ResumenComponent implements OnInit {

  months = [];
  balanceData;
  ingresos = 0;
  gastos = 0;
  lang
  constructor(
    _seo: SeoService,
    private store$: Store<AppStore>
  ) { 
    _seo.addTags('Estadísticas_resumen')
    this.lang = localStorage.getItem('country') || 'COP';
  }

  ngOnInit() {
    this.balanceData = this.store$.select(selectEstadisticas).pipe(filter(e => !!e))
  }

}
