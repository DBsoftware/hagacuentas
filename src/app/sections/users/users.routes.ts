import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { UserSessionGuard } from '../../core/_guards/user-session.guard';
import { HomeComponent } from './home/home.component';
import { MisPresuspuestosComponent } from './mis-presuspuestos/mis-presuspuestos.component';
import { ViewComponent } from './tips/view/view.component';
import { CategoryComponent } from './tips/category/category.component';
import { TipsComponent } from './tips/tips.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    canActivate: [UserSessionGuard],
    children: [
      { path: '', component: HomeComponent },

      { path: 'inicio', component: HomeComponent },

      { path: 'presupuestos', component: MisPresuspuestosComponent },

      { path: 'presupuesto', loadChildren: './presupuesto/presupuesto.module#PresupuestoModule' },

      { path: 'tips-financieros/:idCategory/:id', component: ViewComponent },

      { path: 'tips-financieros/:idCategory', component: CategoryComponent },

      { path: 'tips-financieros', component: TipsComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersSectionRoutingModule { }
