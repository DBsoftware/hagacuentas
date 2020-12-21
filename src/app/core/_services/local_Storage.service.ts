import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { mergeMap, toArray, switchMap, take, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor(private storage: StorageMap) { }

  setData(key, value) {
    return this.storage.set(key, value)
  }
  
  getStorageSize() {
    return this.storage.size
  }
  getData(key) {
    return this.storage.get(key)
  }

  getAll(f){
    return this.storage.keys()
      .pipe(filter(e => e.substr(0,2) === f || e.substr(3,3).includes(f)),mergeMap(res => this.getData(res)),toArray())
  }
  getAllUnsaved(f){
    return this.storage.keys()
      .pipe(filter(e => {
        return e.substr(3,3) === f && e.substr(0,2).includes('un')
      }),mergeMap(res => this.getData(res)),toArray())
  }

  setAndGetData(key, value){
    return this.setData(key, value).pipe(switchMap(()=> this.getData(key)))
  }

  delete(key){
    this.storage.delete(key)
    .pipe(take(1))
    .subscribe();
  }
}

