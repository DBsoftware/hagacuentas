import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../core/_services/seo.service';
import icons from '../../core/_data/general_icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  logo = icons.logo
  constructor(private _seo :SeoService) {
    _seo.addTags('Ingrese_sus_datos_para_iniciar_sesión')
   }

  ngOnInit() {
  }

}
