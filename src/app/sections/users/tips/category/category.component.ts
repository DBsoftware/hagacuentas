import { Component, OnInit } from '@angular/core';
import {  SeoService } from '../../../../core/_services';
import { ActivatedRoute } from '@angular/router';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  idCategory;
  dataCategory = {name:"",icon:""};
  tips = [];
  UrlImg = 'https://cert.spira.co/files/images_view';

  constructor(
    _seo: SeoService,
    private _route:ActivatedRoute
  ) {
    switch (this._route.snapshot.params.idCategory) {
      case '1': 
        _seo.addTags('Consejos_financieros_-_Administración_del_dinero')
        break;
      case '2': 
        _seo.addTags('Consejos_financieros_-_El_ahorro')
        break;
      case '3': 
        _seo.addTags('Consejos_financieros_-_Tarjetas_de_crédito')
        break;
      case '4': 
        _seo.addTags('Consejos_financieros_-_Seguridad_y_tecnología')
        break;
      case '5': 
        _seo.addTags('Consejos_financieros_-_Impuestos_y_seguros')
        break;
      case '6': 
        _seo.addTags('Consejos_financieros_-_El_dinero_en_la_familia')
        break;
      case '7': 
        _seo.addTags('Consejos_financieros_-_Crédito')
        break;
      case '8': 
        _seo.addTags('Cosejos_financieros_-_Vivienda_y_vehículo')
        break;
      case '9': 
        _seo.addTags('Consejos_financieros_-_Economía_y_finanzas')
        break;
    }

  }

  ngOnInit() {

  }

  adjustingContent(e) {
  }

}
