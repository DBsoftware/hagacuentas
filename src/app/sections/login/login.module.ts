import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { FormLoginComponent } from './form-login/form-login.component';
import { LoginRoutingModule } from './login.routes';
import { FormRememberComponent } from './form-remember/form-remember.component';
import { FormRegisterComponent } from './form-register/form-register.component';
import { ShareAppModule } from '../shared/share.module';

@NgModule({
  declarations: [
    LoginComponent,
    FormLoginComponent,
    FormRememberComponent,
    FormRegisterComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    ShareAppModule
  ],
})
export class LoginModule { }
