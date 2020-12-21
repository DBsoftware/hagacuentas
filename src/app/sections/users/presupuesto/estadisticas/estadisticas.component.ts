import { Component, OnInit, ViewChild } from '@angular/core';
import { filter, take, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppStore } from '../../../../core/store/store.interface';
import { selectSelected, actions } from '../../../../core/store/presupuestos';
import { AuxiliarsService } from '../../../../core/_services/auxiliars.service'
import {Location} from '@angular/common';
import { MatDatepicker } from '@angular/material';
import iconos from './iconos_tabs';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss']
})



export class EstadisticasComponent implements OnInit {
  @ViewChild('picker', {static: false}) datePicker: MatDatepicker<any>;
  minDate = new Date(2019, 0, 1);
  maxDate = new Date(2019, 11, 31);
  tabs = iconos
  lang ;
  data; 
  constructor(
    private auxiliars: AuxiliarsService,
    private location: Location,
    private store$: Store<AppStore>
  ) { 
    this.data = this.store$.select(selectSelected)
                .pipe(filter(res => res !== null))
    this.lang = localStorage.getItem('country') || 'CO';
 }

    ngOnInit() {
    }

    monthSelectedHandler(evt){  
      this.store$.dispatch(actions.changePresupuestoSelected({key: 'fecha', value: new Date(evt).toISOString()}))    
        this.datePicker.close()
    }

    openCalendar(){
      this.datePicker.open()
    }


    ngOnDestroy(): void {}

    back() {
      this.location.back();
    }

}



