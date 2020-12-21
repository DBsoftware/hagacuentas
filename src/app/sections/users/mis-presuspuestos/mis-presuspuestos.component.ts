import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { SeoService } from '../../../core/_services';
import { AppStore } from '../../../core/store/store.interface';
import generalIcons from '../../../core/_data/general_icons';
import { Store } from '@ngrx/store';
import { selectList, actions } from '../../../core/store/presupuestos';
import { map, tap } from 'rxjs/operators';
import { PresupuestoList } from '../../../core/store/presupuestos/presupuesto.interface';
import * as uuid from 'uuid';
import { ToastService } from '../../../core/_services/toast.service';
@Component({
  selector: 'app-mis-presuspuestos',
  templateUrl: './mis-presuspuestos.component.html',
  styleUrls: ['./mis-presuspuestos.component.scss']
})
export class MisPresuspuestosComponent implements OnInit {
  presupuestosList
  rojo = generalIcons.rojo
  gris= generalIcons.gris
  next = generalIcons.next 
  loading = false
  @ViewChild('inputPres', {static: false}) inputPres: ElementRef;
  constructor(
    _seo: SeoService,
    private _router:Router,
    private store$: Store<AppStore>,
    private toastService: ToastService,
    private changeDetector : ChangeDetectorRef 
  ) {
     _seo.addTags('Listado_presupuestos') 
      this.presupuestosList = this.store$.select(selectList).pipe(map(Object.values), tap(e => this.loading = false))
      localStorage.removeItem('presupuestoSelected')
    }

  ngOnInit() {}


  ngAfterViewChecked(){
    this.changeDetector.detectChanges();
  } 

  validInpt(e){}

  save(name){
    if (name.length > 0) {
      this.loading = true
      let presupuesto: PresupuestoList = {nombre: name, id: uuid.v4()}
      this.store$.dispatch(actions.add({presupuesto}))
      this.inputPres.nativeElement.value = ''
    }
  }

  searchPres(){}

  selectPresu(presupuesto){
    this.store$.dispatch(actions.selectPresupuesto({presupuestoId:presupuesto.id}));
    this._router.navigate(['/presupuesto/index'])
  }

}
