import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService, SeoService } from '../../../core/_services';

@Component({
  selector: 'app-form-remember',
  templateUrl: './form-remember.component.html',
  styleUrls: ['./form-remember.component.scss']
})
export class FormRememberComponent implements OnInit {

  emailPass = false;
  regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  err: any = false;
  register = false;
  token: any = false;
  newPass;
  DataU;
  email;

  constructor(
    private _seo :SeoService,
    private _route: ActivatedRoute,
    private _cookie:CookieService,
    private _router:Router
  ) { _seo.addTags('Recordar_contraseña') }

  ngOnInit() {

  }

  validEmail(input) {

  }

  remember() {

  }

  validPass(pass1, pass2) {
    this.err = false;
    pass1 = pass1.value;
    pass2 = pass2.value;
    if (pass1.length < 4) {
      this.err = "La contraseña debe tener mínimo 4 caracteres";
      return false;
    }
    if (pass1 != pass2) {
      this.err = "Los campos deben coincidir";
      return false;
    }
    this.emailPass = true;
  }

}
