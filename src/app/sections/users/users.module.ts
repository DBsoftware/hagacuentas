import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersSectionRoutingModule } from './users.routes';

import { UsersComponent } from './users.component';
import { HomeComponent } from './home/home.component';
import { MisPresuspuestosComponent } from './mis-presuspuestos/mis-presuspuestos.component';
import { TipsComponent } from './tips/tips.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginModule } from '../login/login.module';
import { ShareAppModule } from '../shared/share.module';
import { PresupuestoModule } from './presupuesto/presupuesto.module';
import { ViewComponent } from './tips/view/view.component';
import { CategoryComponent } from './tips/category/category.component';

@NgModule({
  imports: [
    CommonModule,
    UsersSectionRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    ShareAppModule,
    LoginModule,
    PresupuestoModule
  ],
  declarations: [
    UsersComponent,
    HomeComponent,
    MisPresuspuestosComponent,
    TipsComponent,
    ViewComponent,
    CategoryComponent,
        /* Pipes */
  ],
})
export class UsersSectionModule { }
