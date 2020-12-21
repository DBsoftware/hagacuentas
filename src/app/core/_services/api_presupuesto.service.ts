import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from './local_Storage.service';
import { switchMap, take, toArray, tap, map, catchError } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { GeneralService } from './general.service';
import { environment } from '../../../environments/environment';
import { ToastService } from './toast.service';
import  categorias   from '../_data/categoriesAux';
import { Presupuesto } from '../store/presupuestos/presupuesto.interface';
import { SyncService } from './sync.service';

@Injectable({
  providedIn: 'root'
})
export class ApiPresupuestosService extends GeneralService<Presupuesto> {
  diezisiete
  constructor(
    _http: HttpClient,
    private toastService:ToastService,
    private _localstorageService: LocalStorageService) {
    super(_http, `${environment.api}presupuesto`);
    this.diezisiete = categorias['ingresos'][1]
   }

  getAllPresupuestos(){
    return this.getAll()
    .pipe(take(1),
          switchMap((res: any) => from(res)),
          map((e:any) => ({...e, categorias: [...e.categorias, this.diezisiete]})),
          map((e:any) => ({...e, categorias: this.acomodarSubcategorias(e.categorias, e.subcategorias)})),
          switchMap((element: any) => this._localstorageService.setData(`p_${element.id}`, element)),
          toArray(),
          switchMap(() => this._localstorageService.getAll('_p_'))
     )
  } 

  acomodarSubcategorias(arreglo, sub) {
    arreglo.map(e => {
      if (e.id == 17) {
        e.subcategorias = sub.filter(e => e.id_categoria == 17)
      }
    })
    return arreglo
  }

  addPresupuesto(obj){
    let objServer = {...obj, tipo: 1, estado: 1, fecha:new Date().toDateString()}
    return  this._localstorageService.getStorageSize()
    .pipe(
      switchMap(e_one => of({...objServer, id_app: e_one})),
      map(e => this.addFields(e,this.diezisiete)),
      switchMap( (e_two: any) => 
      this._localstorageService.setAndGetData(`p_${e_two['id']}`, {...e_two})
      .pipe(switchMap(e => this.createOne(this.removeFields(e)).pipe(take(1),map(e => this.addFields(e,this.diezisiete)),catchError(er => {
          this.toastService.sendNotification(`No fue posible respaldar este presupuesto`)
          return this._localstorageService.setAndGetData(`un_p_${e_two['id']}`, e_two)
        }),
          tap(res =>{
            this._localstorageService.setData(`p_${res['id']}`, res)
            .subscribe(e=> this._localstorageService.delete(`p_${e_two['id']}`))
          })
        )))
      ))
    }

    addPresupuestoSync(obj) {

    }

    addFields(e: any, el17) {
      let con17 = []
      con17.push(el17)
      return ({...e,categorias: ('categorias' in e)?[...e.categorias, ...con17]:con17,movimientosPredeterminados: [], alertas: []})
    }
    removeFields(e: any) {
      delete e['id']
      delete e['categorias']
      delete e['movimientosPredeterminados']
      delete e['alertas']
      return ({...e,categorias: [],movimientosPredeterminados: [], alertas: []})
    }
    
    
  }