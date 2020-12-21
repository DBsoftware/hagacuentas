import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlertsComponent } from './alerts.component';
import { AddAlertComponent } from './add/add.component';

const routes: Routes = [
  {
    path: 'presupuesto/alerts',
    children: [
      { path: '', component: AlertsComponent },
      { path: 'add', component: AddAlertComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlertsRoutingModule { }
