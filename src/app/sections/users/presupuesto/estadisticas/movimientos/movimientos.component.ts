import { Component, OnInit, Input } from '@angular/core';
import generalIcons from '../../../../../core/_data/general_icons';
import { Router } from '@angular/router';
import { SeoService } from '../../../../../core/_services';
import { Store } from '@ngrx/store';
import { AppStore } from '../../../../../core/store/store.interface';
import { selectEstadisticas, selectSelected, selectsubCategoriasIngresos, selectCategoriasGastos, selectFecha } from '../../../../../core/store/presupuestos';
import { filter, switchMap, distinctUntilChanged, map, tap } from 'rxjs/operators';
import { AuxiliarsService } from '../../../../../core/_services/auxiliars.service';
import icons from '../../add/icons.base64';
import newIconsGastos from '../../add/new_gastos';
import newIconsingresos from '../../add/new_ingresos';
import { takeUntilDestroy } from 'take-until-destroy';

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.scss']
})
export class MovimientosComponent implements OnInit {
  Iconos = icons
  newIconosG = newIconsGastos
  newIconosI = newIconsingresos
  generalIcons = generalIcons
  next = generalIcons.next
  data;
  date = `${new Date().getDate()}/${new Date().getUTCMonth() +1}/${new Date().getUTCFullYear()}`;
  ingresosMov;
  gastosMov
  months;
  balanceData
  lang = 'CO';
  subCategories
  subscriptionsM: any;
  fecha
  constructor(
    private store$: Store<AppStore>,
    private auxiliars: AuxiliarsService,
    private _router: Router,
    _seo: SeoService
  ) { 
    this.balanceData = this.store$.select(selectEstadisticas).pipe(filter(e => !!e))
    this.store$.select(selectFecha).pipe(takeUntilDestroy(this))
    .subscribe(res => this.fecha = res)
    _seo.addTags('Estadísticas_movimientos')
    this.lang = localStorage.getItem('country') || 'COP';
  }

  ngOnInit() {
    this.gastosMov = this.store$.select(selectSelected)
    .pipe(filter(res => !!res),
    switchMap(() => this.store$.select(selectsubCategoriasIngresos)
              .pipe(
              distinctUntilChanged(),
              map(e=> e.sort(({id: a},{id: b}) => (a < b) ?  -1 : ((a > b)? 1 : 0))))),
              map(res => res.filter(e => !!e.movimientos && e.movimientos != undefined && e.movimientos.length > 0)),
              map((res) => this.ingresosMov = res.map(e => ({nombre: e.nombre, imagen: e.imagen, tipo: e.tipo.data[0] ,total: this.auxiliars.sacarBalance(e, this.fecha)}))),
              tap((res) => this.ingresosMov = this.ingresosMov.filter(e => e.total > 0)),
              switchMap(() => this.store$.select(selectCategoriasGastos)
              .pipe(
                distinctUntilChanged(),
                map(e=> e.sort(({id: a},{id: b}) => (a < b) ?  -1 : ((a > b)? 1 : 0))),
                map(res => res.filter(e => this.auxiliars.sacarBalance(e, this.fecha))),
                map((res) => res.map(e => ({nombre: e.nombre, imagen: e.imagen, tipo: e.tipo.data[0] ,total: this.auxiliars.sacarBalance(e, this.fecha), subcategorias: e.subcategorias}))), 
                map((res) => res.filter(e => e.total > 0)),
              )))
      localStorage.removeItem('categoria')
      localStorage.removeItem('subCategoria')
      localStorage.removeItem('valor')
  }
  
  imgParser(categoria){
    if (this.auxiliars.sacarBalance(categoria, this.fecha) > 0) {
      categoria.imagen = categoria.imagen.replace('_off','')
    }
    else 
      categoria.imagen += categoria.imagen.includes('_off') ? ''  :  '_off'
    let img = this.auxiliars.quitarTilde(categoria.imagen)
    if (!img.includes('new')) {
      return this.Iconos[img] ? this.Iconos[img.trim()] :  this.Iconos[img.replace('_off','').trim()]
    }
    return categoria.tipo === 1 ? this.newIconosI[img.replace('new/','')] :
                                  this.newIconosG[img.replace('new/','')]
  }

  activeSub(subCateg) {
    if (!subCateg.subcategorias) {
      if (!localStorage.getItem('categoria')) {
        localStorage.setItem('categoria', JSON.stringify({'id': subCateg.id_categoria, 'nombre': subCateg.id_categoria == 1 ? 'Ingresos': 'Otros Ingresos'}) )
      }
      localStorage.setItem('subCategoria', JSON.stringify({'id': subCateg.id, 'nombre': subCateg.nombre, 'imagen': subCateg.imagen}))
      localStorage.setItem('valor', `${this.auxiliars.sacarBalance(subCateg, this.fecha)}`)
      this._router.navigateByUrl(`/presupuesto/${subCateg.tipo == 1 ? 'ingresos': 'gastos'}/calculadora`);
      return
    }
    localStorage.setItem('categoria', JSON.stringify(subCateg) )
    this.subCategories = subCateg.subcategorias
  }



  validationsMov() {

  }

  ngOnDestroy(): void {
  }

}
