import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from './local_Storage.service';
import { GeneralService } from './general.service';
import { environment } from '../../../environments/environment';
import { ToastService } from './toast.service';
import { Store } from '@ngrx/store';
import { AppStore } from '../store/store.interface';
import { actions } from '../store/presupuestos';
import * as uuid from 'uuid';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { of, from } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiMovimientosService extends GeneralService<any> {
  constructor(
    _http: HttpClient,
    private toastService:ToastService, private store$: Store<AppStore>,
    private _localstorageService: LocalStorageService) {
    super(_http, `${environment.api}`);
   }
   
   addMovimientos(movimiento, doesRedux = true){
     console.log('el movimiento', movimiento)
     movimiento['id'] = movimiento['id'] === undefined ? uuid.v4() : movimiento['id'];
     let movimientoRedux = {...movimiento, 
      id_categoria: JSON.parse(localStorage.getItem('categoria'))['id'],
      fecha_movimiento: movimiento.fecha_movimiento || new Date().toISOString()
    }
    let id_categoria = JSON.parse(localStorage.getItem('categoria'))['id']
    movimiento['fecha_movimiento'] = movimiento['fecha_movimiento']  || new Date().toISOString()
    if (doesRedux) {
      this.store$.dispatch(actions.addMovimiento({movimiento: movimientoRedux}))
    }
      return this._localstorageService.setAndGetData(`un_m_${movimiento['id']}`, movimiento)
      .pipe(switchMap(res => this._localstorageService.getData(`p_${localStorage.getItem('presupuestoSelected')}`)),
        map((res: any) => id_categoria < 17 ? 
            this.addToMovimientoPredeterminado(res, movimiento) : this.addToSubcategorie(res, id_categoria ,movimiento)
        ),
        switchMap(res => this._localstorageService.setAndGetData(`p_${localStorage.getItem('presupuestoSelected')}`,res )),
        switchMap(res => id_categoria < 17 ?
         this.createMovimiento(movimiento, 'Predeterminado'): this.createMovimiento(movimiento, 'movimiento')),
        catchError(er => {
          this.toastService.sendNotification(`No fue posible respaldar este movimiento`)
          if (doesRedux) {
            this.store$.dispatch(actions.selectPresupuesto({presupuestoId:JSON.parse(localStorage.getItem('presupuestoSelected'))}));
          }
          return of(false)
        })).pipe(switchMap(res => {
          if (res) {
            console.log('respuesta',res)
            this._localstorageService.delete(`un_m_${movimiento['id']}`)
            if (doesRedux) {
              this.store$.dispatch(actions.changeMovementId({payload: {
                id_categoria: id_categoria,
                id_subcategoria: movimiento.id_subcategoria,
                id: movimiento['id'],
                newId: res['id']
              }}))
            }
            return this._localstorageService.getData(`p_${localStorage.getItem('presupuestoSelected')}`)
            .pipe(
              map((res2: any) => id_categoria < 17 ? 
                  this.changeInMovimientoPredeterminado(res2, ({...movimiento, newId: res['id']})) : this.changeInSubcategorie(res2, id_categoria, ({...movimiento, newId: res['id']}))
              ),
              switchMap(res => this._localstorageService.setData(`p_${localStorage.getItem('presupuestoSelected')}`,res )),
              tap(e => {
                if (doesRedux) {
                  this.store$.dispatch(actions.selectPresupuesto({presupuestoId:JSON.parse(localStorage.getItem('presupuestoSelected'))}))}
                }
                )
            )
          }
          return of(true)
        }))     
   }

  addToSubcategorie(res, id_categoria,movimiento){
    console.log('por acá', res)
    return ({...res, categorias: res.categorias.map(e => {
      if (e.id == id_categoria) {
        e.subcategorias.map(sub => {
          if (sub.id == movimiento.id_subcategoria) {
            if (!(sub.movimientos.every(mov => mov.id !== movimiento.id))) {
              console.log('arreglo')
              sub.movimientos.map((mov) => (mov.id == movimiento.id) ? movimiento : mov )
            } else {
              console.log('nuevo')
              sub.movimientos.push(movimiento)
            }
          }
          return sub
        })
      }
    return e
    })})
  }

  addToMovimientoPredeterminado(res, mov){
    return !(res.movimientosPredeterminados.every(e => e.id !== mov.id)) ?
      ({...res, movimientosPredeterminados: res.movimientosPredeterminados.map((e) => (e.id == mov.id) ? mov : e )}):
      ({...res, movimientosPredeterminados: [...res.movimientosPredeterminados, mov]})
  }
  changeInSubcategorie(res, id_categoria ,movimiento){
    console.log('segundo', res)
    return ({...res, categorias: res.categorias.map(e => {
      if (e.id == id_categoria) {
        e.subcategorias.map(sub => {
          if (sub.id == movimiento.id_subcategoria) {

            sub.movimientos = sub.movimientos.map((mov) => (mov.id == movimiento.id) ? {...movimiento, id: movimiento.newId} : mov )
            } 
          return sub
        })
      }
      return e 
    })})
  }

  changeInMovimientoPredeterminado(res, mov){
    return ({...res, movimientosPredeterminados: res.movimientosPredeterminados.map((e) => (e.id == mov.id) ? {...mov, id: mov.newId} : e )})
  }



}