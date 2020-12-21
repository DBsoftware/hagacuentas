import { Injectable, Inject, Injector } from '@angular/core';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, tap } from 'rxjs/operators';
import { throwError, empty } from 'rxjs';
import { CookieService } from '../_services';
import { Router } from '@angular/router';
declare var localStorage : any;


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  _cookie
  constructor(private router: Router, private injector: Injector) {
    this._cookie = this.injector.get(CookieService);

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authToken = this._cookie.get('session');
    if(authToken){
      if (!authToken.includes('anonymous')) {
        request = request.clone({
            headers: request.headers.set('Authorization', 'Bearer '+ authToken)
        });
      } else
        return empty();
    }
    return next.handle(request)
            .pipe(catchError((err: HttpErrorResponse) => {
              if (err.status === 401 && !this.router.url.includes('/login')) 
                this.router.navigate(['/login'])
              return throwError( err );
            }),
              tap((res: HttpResponse<any>) => {
                if ('url' in res && res.url.includes('signin') && res.status === 201) {
                  // localStorage.setItem('token', res.body.accessToken)
                  this._cookie.set('session', res.body.accessToken)
                  let code;
                  switch (res.body.country) {
                    case 'CR':
                      code ='CRC'
                      break;
                    case 'CRC':
                      code ='CRC'
                      break;
                    case 'SV':
                      code ='US'
                      break;
                    default:
                      code = 'COP';
                      break;
                  }
                  localStorage.setItem('country',code)
                }
            }));
  }


}

