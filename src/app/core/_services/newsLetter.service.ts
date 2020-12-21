import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import "rxjs/add/operator/retry";

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

  constructor(private http: HttpClient) {

  }

  addPushSubscriber(sub:any) {
      return this.http.post('/api/subscription', sub);
  }

  // send() {
  //     return this.http.post('/api/send', null);
  // }

}