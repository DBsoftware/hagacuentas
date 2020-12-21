import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { SeoService } from '../../../core/_services';
import { Router, ActivatedRoute, NavigationEnd, Event } from '@angular/router';

@Component({
  selector: 'app-tips',
  templateUrl: './tips.component.html',
  styleUrls: ['./tips.component.scss']
})
export class TipsComponent implements OnInit {

  categories = [];
  query: any = false;
  queryParam; queryParamT;
  viewCategTip: any;
  UrlImg = 'https://cert.spira.co/files/images_view';
  tips;
  finishedSearch=false;

  constructor(
    _seo: SeoService,

  ) {
    _seo.addTags('Consejos_financieros')

  }

  ngOnInit() {

  }

  searchTip() {
  }

  changevalue(value) {
  }

  goSearch() {
  }

  getIcon(idCateg, icon) {

  }

}
