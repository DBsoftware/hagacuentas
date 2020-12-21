import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ToastService } from './toast.service';
import { LocalStorageService } from './local_Storage.service';
import { Store } from '@ngrx/store';
import { AppStore } from '../store/store.interface';
import { actions, selectSelected, selectPresupuestoState } from '../store/presupuestos';
import { switchMap, catchError, tap, map, take } from 'rxjs/operators';
import * as uuid from 'uuid';
import { of, from } from 'rxjs';
import { AuxiliarsService } from './auxiliars.service';
import { Action } from 'rxjs/internal/scheduler/Action';
import { Actions } from '@ngrx/effects';
import { SyncService } from './sync.service';

@Injectable({
  providedIn: 'root'
})
export class ApiCategoriasService  extends GeneralService<any> {
  

  constructor(_http: HttpClient, private toastService:ToastService, private store$: Store<AppStore>,
    private auxiliars: AuxiliarsService,
    private _localstorageService: LocalStorageService) { 
    super(_http,`${environment.api}`)
  }


 addCategoria(categoria: any, doesRedux = true) {
    categoria = {id : categoria['id'] ? categoria['id'] : uuid.v4(), ...categoria}
    if (doesRedux) {
      this.store$.dispatch(actions.addCategoria({categoria}))
    }
    return this._localstorageService.setAndGetData(`un_c_${categoria['id']}`, categoria)
    .pipe(switchMap(res => this._localstorageService.getData(`p_${localStorage.getItem('presupuestoSelected')}`)
        .pipe(map((e:any) => ({...e, categorias: [...e.categorias, categoria]})),
        switchMap(res => this._localstorageService.setAndGetData(`p_${localStorage.getItem('presupuestoSelected')}`,res )),
        switchMap(res => this.createOne({...categoria, tipo : 0}, 'categoria')),
        catchError(er => {
          this.toastService.sendNotification(`No fue posible respaldar esta categoria`)
          return of(false)
        }))
        .pipe(switchMap(res => {
          if (res) {
            localStorage.setItem('id_categoria', res['id'] )
            this._localstorageService.delete(`un_c_${categoria['id']}`)
            if (doesRedux) {
              this.store$.dispatch(actions.changeCategoriaId({payload: {tempId: categoria['id'], id: res['id']}}))
            }
            this._localstorageService.getData(`p_${localStorage.getItem('presupuestoSelected')}`)
            .pipe(take(1),map((e:any) => ({...e, categorias: this.auxiliars.changeId(e.categorias, res['id'], categoria['id'])})),
            switchMap(res => this._localstorageService.setData(`p_${localStorage.getItem('presupuestoSelected')}`,res )))
            .subscribe()
          }
          
          return of(true)
        }))
    ))
 }

 addSubcategoria(subcategoria, carrefour, doesRedux =  true) {
  subcategoria = {...subcategoria, id: subcategoria['id']? subcategoria['id'] :uuid.v4()}
  if (doesRedux) {
    if (carrefour) {
      this.store$.dispatch( actions.addSubcategoriaGasto({subcategoria}))
    } else {
      this.store$.dispatch(actions.addSubcategoriaIngreso({subcategoria}))
    }
  }
  return this._localstorageService.setAndGetData(`un_s_${subcategoria['id']}`, subcategoria)
  .pipe(switchMap(res => this._localstorageService.getData(`p_${localStorage.getItem('presupuestoSelected')}`)
      .pipe(map((e:any) => ({...e, categorias: carrefour ?
         this.auxiliars.addSubGasto(e['categorias'], subcategoria):
         this.auxiliars.addSubIngresos(e['categorias'], subcategoria)})),
      switchMap(res => this._localstorageService.setAndGetData(`p_${localStorage.getItem('presupuestoSelected')}`,res )),
      switchMap(res => this.createOne(subcategoria, 'subcategoria')),
      catchError(er => {
        this.toastService.sendNotification(`No fue posible respaldar esta subcategoria`)
        return of(false)
      }))
      .pipe(switchMap(res => {
        if (res) 
          this._localstorageService.delete(`un_s_${subcategoria['id']}`)

        return this._localstorageService.getData(`p_${localStorage.getItem('presupuestoSelected')}`)
                .pipe(
                  tap(e => console.log(e)),
                  map((e: any) => ({...e, categorias: this.auxiliars.changeSubIdofCat(e.categorias, subcategoria['id'], res['id'], res['id_categoria'])})),
                      map((e: any) => ({...e, subcategorias: this.auxiliars.changeSubId(e.subcategorias, subcategoria['id'], res['id'])})),
                      switchMap(res => this._localstorageService.setAndGetData(`p_${localStorage.getItem('presupuestoSelected')}`,res )),
                      tap(e => {
                        if (doesRedux) {
                          this.store$.dispatch(actions.selectPresupuesto({presupuestoId: localStorage.getItem('presupuestoSelected')}))
                        }
                      })
                )

      }))
  ))
  
 }




ValidateType(variable:any) {
  if (typeof variable == 'number') {
    return variable == 0
  }
  return variable['data'][0] === 0
}

}
