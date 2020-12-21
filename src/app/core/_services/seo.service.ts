import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import "rxjs/add/operator/retry";
import { Meta, Title } from '@angular/platform-browser';
import seoInfo, {SeoTitles} from '../_data/seoInfo';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(private meta: Meta, private _title:Title,) {}

  addTags(title) {
    this._title.setTitle(seoInfo[SeoTitles[title]][0])
    let tagsArray = ['description', 'keywords'].map((e,i) => ({name : e , content: seoInfo[SeoTitles[title]][(i+1)] }))
    tagsArray.forEach(e => {
      this.meta.updateTag(e);
    })
  }


}