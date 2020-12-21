import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CookieService, SeoService} from '../../../core/_services';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TermsComponent } from '../../shared/terms/terms.component';
import { ApiUserService } from '../../../core/_services/api_user.service';
import { take } from 'rxjs/operators';
import { ToastService } from '../../../core/_services/toast.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.scss']
})
export class FormRegisterComponent implements OnInit {
  myForm: FormGroup;
  
  err: any = false; register = false;
  terms: any = false;
  activeInptTerms = false;
  openTerms = false
  
  constructor(
    private fb: FormBuilder,
    private _seo :SeoService,
    private apiUser: ApiUserService,
    private _router:Router,
    private _cookie: CookieService,
    private modalService: NgbModal,
    private toastService: ToastService,
    private location: Location,
  ) { _seo.addTags('Registro') }

  ngOnInit() {
    const formOptions = {
      correo: ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)]],
      clave:['', [Validators.required, Validators.minLength(4)]],
      aceptar: [false, Validators.requiredTrue]
    }
    this.myForm = this.fb.group(formOptions);
    
   }

  activeTerms() {

  }

  onSubmit() {
    if (this.myForm.valid) {
      this.apiUser.signUp({...this.myForm.value, moneda: localStorage.getItem('country'), pais: this.setCountry(localStorage.getItem('country')), fecha_registro: this.setFechaRegistro() })
      .pipe(take(1))
      .subscribe(res => {
        this.toastService.sendNotification(`Registro exitoso ${res.correo}`)
        this._router.navigate([''])
      }
      )
    }
  }

  setCountry(moneda){
    switch (moneda) {
      case 'CR':
        return 'Costa Rica'
      case 'CRC':
        return 'Costa Rica'
      case 'SV':
        return 'El salvador'
      default:
        return 'Colombia';
    }
  }

  setFechaRegistro(){
    return new Date().getTime()
  }

  open() {
    this.modalService.open(TermsComponent);
  }

  back() {
    this.location.back();
  }

}
