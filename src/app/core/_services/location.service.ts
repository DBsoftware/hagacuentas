import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  API_KEY = '728e7f302879e6'
  constructor(private httpClient: HttpClient) { }

  getCodeFromApi() {
      return this.httpClient.get('https://ipinfo.io/', {params: {'token': this.API_KEY}})
      .pipe(take(1),map(res => res['country']))
    }
}


