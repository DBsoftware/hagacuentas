import { Injectable } from '@angular/core';
import { UserAuthentication } from '../interfaces/user.interface';
import { GeneralService } from './general.service';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiUserService extends GeneralService<UserAuthentication> {

    constructor(
        _http: HttpClient) {
        super(_http, `${environment.api}auth`);
       }
    
    signIn(obj) {
        return this.post(obj, '/signin')
    }

    signUp(obj){
        return this.post(obj, '/signup')
    }
}
