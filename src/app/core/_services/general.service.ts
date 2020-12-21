import { Injectable } from '@angular/core';
import { httpFactory } from '@angular/http/src/http_module';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
    
export abstract class GeneralService<T> {
  constructor(protected _http, protected url:string){
  }
  
  getAll():Observable<T[]> {
    return this._http.get(this.url).pipe(map(resp=>resp as T[]));
  }
  getOne(id:number):Observable<T> {
    return this._http.get(`${this.url}${id}`).pipe(map(resp=>resp as T));
  }
  post(obj, urlAddition = '') {
    return this._http.post(`${this.url}${urlAddition}`, obj);
  }
  createOne(obj, urlAddition = '') {
    console.log('to save',obj)
    if('id' in obj)
      delete obj['id']
    return this._http.post(`${this.url}${urlAddition}`, obj);
  }
  createMovimiento(obj, urlAddition = '') {
    return this._http.post(`${this.url}${urlAddition}`, obj);
  }
}
