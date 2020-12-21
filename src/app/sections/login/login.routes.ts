import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { FormLoginComponent } from './form-login/form-login.component';
import { FormRememberComponent } from './form-remember/form-remember.component';
import { FormRegisterComponent } from './form-register/form-register.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    children: [
      { path: '', component: FormLoginComponent },
      { path: 'remember', component: FormRememberComponent },
      { path: 'register', component: FormRegisterComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
