import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CookieService, LocationService } from '../../../core/_services';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiUserService } from '../../../core/_services/api_user.service';
import { take } from 'rxjs/operators';
import { ToastService } from '../../../core/_services/toast.service';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss']
})
export class FormLoginComponent implements OnInit, OnDestroy {
  myForm: FormGroup;
  constructor(
    private _cookie:CookieService,
    private _router:Router,
    private fb: FormBuilder,
    private userService: ApiUserService,
    public toastService: ToastService
  ) { 
    this._cookie.delete('session')
  }

  ngOnInit() {
    const formOptions = {
      correo: ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)]],
      clave:['', Validators.required]
    }
    this.myForm = this.fb.group(formOptions);
  }

  anonymous(){
    this._cookie.set('session','anonymous');
    this._router.navigate(['/']);
  }



  onSubmit() {
    if (this.myForm.valid) {
      this.userService.signIn(this.myForm.value)
      .pipe(take(1))
      .subscribe(res => {
        this._cookie.set('session', res.accessToken);
        localStorage.setItem('correo', this.myForm.value.correo)
        this._router.navigate([''])
      }
      )
    }
  }

  ngOnDestroy() {/**/}


}
