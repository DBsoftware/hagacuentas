import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatDatepicker } from '@angular/material';
import {Location} from '@angular/common';
import { Store } from '@ngrx/store';
import { AppStore } from '../../../../core/store/store.interface';
import generalIcons from "../../../../core/_data/general_icons";
import { actions, selectFecha } from '../../../../core/store/presupuestos';
import { AuxiliarsService } from '../../../../core/_services/auxiliars.service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.scss']
})
export class CabeceraComponent implements OnInit {
  @ViewChild('picker', {static: false}) datePicker: MatDatepicker<any>;
  minDate = new Date(2009, 0, 1);
  maxDate = new Date(2029, 11, 31);
  generalIcons = generalIcons
  data

  month
  constructor(private location: Location, private store$: Store<AppStore>, public  auxiliars:AuxiliarsService) {
    this.month =  this.store$.select(selectFecha).pipe(map(fecha => new Date(fecha).getMonth()))
   }

  ngOnInit() {
  }

  back() {
    this.location.back();
  }

  openCalendar(){
    this.datePicker.open()
  }

  monthSelectedHandler(evt){  
    this.store$.dispatch(actions.setMesFiltrado({ fecha: new Date(evt).toISOString()}))    
      this.datePicker.close()
  }

}
