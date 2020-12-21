import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NotFound404Component } from './sections/not-found404/not-found404.component';

const routes: Routes = [
  { path: 'notFound', component: NotFound404Component },
  {
    path: '',
    loadChildren: './sections/users/users.module#UsersSectionModule'
  },
  {
    path: 'login',
    loadChildren: './sections/login/login.module#LoginModule'
  },
  { path: '**', pathMatch: 'full', redirectTo: 'notFound' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
