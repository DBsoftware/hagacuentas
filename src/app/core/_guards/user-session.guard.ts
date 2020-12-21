import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from '../_services';

@Injectable({
  providedIn: 'root'
})
export class UserSessionGuard implements CanActivate {

  constructor(
    private _cookie:CookieService,
    private _router:Router
    ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this._cookie.get('session'))
      return true;
    else {
      this._router.navigate(['/login']);
      return false;
    }
  }
}
