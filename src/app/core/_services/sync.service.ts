import { Injectable } from '@angular/core';
import { LocalStorageService } from './local_Storage.service';
import { switchMap, map, concatAll, tap } from 'rxjs/operators';
import { ApiPresupuestosService } from './api_presupuesto.service';
import { ApiCategoriasService } from './api_categorias.service';
import { ApiMovimientosService } from './api_movimiento.service';
import { of, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SyncService {

  constructor(private local:LocalStorageService, 
    private apiPresupuestosService:ApiPresupuestosService,
    private apiCategoriasService: ApiCategoriasService,
    private apiMovimientosService: ApiMovimientosService,
    ) { }

  sync(){
    return this.local.getAllUnsaved('_p')
            .pipe(
              switchMap(a => from(a)),
              switchMap(a => this.addPresupuestoSync(a)),
              concatAll()
            )
  }

  addPresupuestoSync(obj){
    let oldId = obj.id
    let newId = null
      return this.apiPresupuestosService.createOne(this.apiPresupuestosService.removeFields(obj))
      .pipe(
        tap(e => {
          if (e['id']) {
            this.local.delete(`un_p_${oldId}` )
          }
        }),
        switchMap(e => this.local.setData(`p_${e['id']}`,e )),
        switchMap(res => {
        newId = res['id'];
        return this.local.getAllUnsaved('_c_')
      }),
      switchMap((c: any) => from(c)),
      switchMap((c: any) => {
        if (c['id_presupuesto'] == oldId && newId) {
          c['id_presupuesto'] = newId
        }
        return this.syncCategorias({...c, oldPreId: oldId})
      }) 
      )
  }


  syncCategorias(obj){
    let oldId = obj.id
    let id_pre = obj.id_presupuesto
    let oldPreId = obj.oldPreId
    let newId = null
    delete obj.oldPreId
      return this.apiCategoriasService.addCategoria(obj)
      .pipe(
        switchMap(res => {
        newId = res['id'];
        return this.local.getAllUnsaved('_s_')
      }),
      switchMap((c: any) => from(c)),
      switchMap((c: any) => {
        if ((c['id_presupuesto'] == id_pre || c['id_presupuesto'] == oldPreId ) && (c['id_categoria'] == oldId ) && newId) {
          c['id_presupuesto'] = id_pre
          c['id_categoria'] = newId
        }
        return this.syncSubCategorias({...c, oldPreId})
      }) 
      )
  }
  syncSubCategorias(obj){
    let oldId = obj.id
    let id_pre = obj.id_presupuesto
    let oldPreId = obj.oldPreId
    let newId = null
    delete obj.oldPreId
      return this.apiCategoriasService.addSubcategoria(obj, this.apiCategoriasService.ValidateType(obj.tipo))
      .pipe(switchMap((res: any) => {
        newId = res['id'];
        return this.local.getAllUnsaved('_m_')
      }),
      switchMap((c: any) => from(c)),
      switchMap((c: any) => {
        if ((c['id_presupuesto'] == id_pre || c['id_presupuesto'] == oldPreId ) && (c['id_subcategoria'] == oldId ) && newId) {
          c['id_presupuesto'] = id_pre
          c['id_subcategoria'] = newId
        }
        return this.syncSubCategorias({...c, oldPreId})
      }) 
      )
  }
  syncMovimiento(obj){
    return this.apiMovimientosService.addMovimientos(obj)
  }
}
