import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class CookieService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  get(name: string) {
    if(isPlatformBrowser(this.platformId)){
      const value = "; " + document.cookie;
      const parts = value.split("; " + name + "=");

      if (parts.length == 2) {
        return parts.pop().split(";").shift();
      }
    }
  }

  set(name: string, val: string, expires: any = false) {
    const date = new Date();
    const value = val;

    // Set it expire in 7 days
    date.setTime(expires || date.getTime() + (7 * 24 * 60 * 60 * 1000));

    // Set it
    if(isPlatformBrowser(this.platformId)){
      document.cookie = name + "=" + value + "; expires=" + date.toUTCString() + "; path=/";
    }
  }

  delete(name: string) {
    const date = new Date();
    // Set it expire in -1 days
    date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));
    // Set it
    if(isPlatformBrowser(this.platformId)){
      document.cookie = name + "=; expires=" + date.toUTCString() + "; path=/";
    }
  }

}
