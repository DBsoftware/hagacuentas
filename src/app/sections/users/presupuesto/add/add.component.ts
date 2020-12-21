import { Component, OnInit, ChangeDetectorRef, AfterViewChecked} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { SeoService } from '../../../../core/_services';
import { Store } from '@ngrx/store';
import { AppStore } from '../../../../core/store/store.interface';
import { selectSelected, selectCategoriasGastos, selectsubCategoriasIngresos, selectEstadisticas, selectFecha } from '../../../../core/store/presupuestos';
import { map, tap, switchMap, filter, distinctUntilChanged} from 'rxjs/operators';
import { AuxiliarsService } from '../../../../core/_services/auxiliars.service';
import icons from './icons.base64';
import generalIcons from "../../../../core/_data/general_icons";
import newIconsGastos from './new_gastos';
import newIconsingresos from './new_ingresos';
import { takeUntilDestroy } from 'take-until-destroy';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit, AfterViewChecked {

  Iconos = icons
  newIconosG = newIconsGastos
  newIconosI = newIconsingresos
  generalIcons = generalIcons
  categories
  type
  data
  lang = 'CO';
  subCategories
  edit = null
  balanceData
  fecha
  loadDataSpinner;
  carrefour
  cancelTimeOut;

  constructor(
    private auxiliars: AuxiliarsService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _seo: SeoService,
    private store$: Store<AppStore>,
    private changeDetector : ChangeDetectorRef 
  ) {
    this.store$.select(selectFecha).pipe(takeUntilDestroy(this), filter(e => e != undefined))
    .subscribe(res => this.fecha = res)
    this.data = this.store$.select(selectSelected)
                .pipe(filter(res => res !== null))
    this.lang = localStorage.getItem('country') || 'CO';
    this.categories =  this._route.params.pipe(
      tap(res => this.type = res.type),
      tap(res => res.type.includes('ingresos') ?
               this._seo.addTags('Tipo_de_ingreso_presupuesto') :
               this._seo.addTags('Tipo_de_gastos_presupuesto')),
      switchMap(({type}) => this.tipoCarrefour(type)))  
  }

  ngAfterViewChecked(){
    this.changeDetector.detectChanges();
  }

  tipoCarrefour(tipo) {
    
    return this.store$.select(selectSelected)
                  .pipe(filter(res => !!res),
                  switchMap(() => tipo.includes('ingresos') ? 
                            this.store$.select(selectsubCategoriasIngresos)
                            .pipe(map((e)=> {
                                return e.sort((a,b) =>
                                  (this.auxiliars.sacarBalance(a, this.fecha) > this.auxiliars.sacarBalance(b, this.fecha)) ?
                                    -1 : 
                                    ((this.auxiliars.sacarBalance(a, this.fecha) < this.auxiliars.sacarBalance(b, this.fecha))? 1 : 0))
                               }
                            )):  
                            this.store$.select(selectCategoriasGastos)
                            .pipe(map((e) => {
                              return e.sort((a,b) =>
                                 (this.auxiliars.sacarBalance(a, this.fecha) > this.auxiliars.sacarBalance(b, this.fecha)) ?
                                   -1 : 
                                   ((this.auxiliars.sacarBalance(a, this.fecha) < this.auxiliars.sacarBalance(b, this.fecha))? 1 : 0))
                              }
                            ))))
  }

  ngOnInit() {
    this.balanceData = this.store$.select(selectEstadisticas).pipe(filter(e => !!e))
  }

  ngOnDestroy(): void {console.log('its destroy')}

  imgParser(categoria){
    if (this.auxiliars.cleanNumber(this.auxiliars.sacarBalance(categoria, this.fecha)) > 0)
      categoria.imagen = categoria.imagen.replace('_off','')
    else 
      categoria.imagen += categoria.imagen.includes('_off') ? ''  :  '_off'
    let img = this.auxiliars.quitarTilde(categoria.imagen).trim()
    if (!img.includes('new')) 
      return this.Iconos[img] ? this.Iconos[img.trim()] :  this.Iconos[img.replace('_off','').trim()]
    return this.type.includes('ingresos') ? this.newIconosI[img.replace('new/','')] :
                                            this.newIconosG[img.replace('new/','')]
  }

  selectCategory(subCateg) {
    this.edit = null;
      if (!subCateg.subcategorias) {
        if (!localStorage.getItem('categoria')) 
          localStorage.setItem('categoria', JSON.stringify({'id': subCateg.id_categoria, 'nombre': subCateg.id_categoria == 1 ? 'Ingresos': 'Otros Ingresos'}) )
        localStorage.setItem('subCategoria', JSON.stringify(subCateg))
        localStorage.setItem('valor', `${this.auxiliars.sacarBalance(subCateg, this.fecha)}`)
        localStorage.setItem('movimiento', JSON.stringify(this.auxiliars.sacarMovimiento(subCateg, this.fecha)))
        this._router.navigateByUrl(`/presupuesto/${this.type}/calculadora`);
      } else {
        localStorage.setItem('categoria', JSON.stringify({'id': subCateg.id, 'nombre': subCateg.nombre}) )
        this.subCategories = subCateg.subcategorias
      }
  }


  editCategorie(subCateg) {
      this.edit = subCateg['id']
  }
  downPress() {
    this.carrefour = false;
    this.cancelTimeOut = setTimeout(() => {
      this.carrefour = true
    }, 500);
  }

  upPress(subCateg) {
    clearTimeout(this.cancelTimeOut)
    !this.carrefour ? this.selectCategory(subCateg) : this.editCategorie(subCateg);
  }

  activateEdit(subCateg) {}

  action(type, subcateg) {
    if (type) {
      this.auxiliars.emitirCategoria(subcateg)
      this._router.navigateByUrl(`/presupuesto/${this.type}/editar-categoria`)
    } else {
      console.log('borrar')
    }
  }

  delete() {}

// Métodos auxiliares para observables


}
