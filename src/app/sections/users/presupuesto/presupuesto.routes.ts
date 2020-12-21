import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PresupuestoComponent } from './presupuesto.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { EditComponent } from './edit/edit.component';
import { CategoryAddComponent } from './add/category-add/category-add.component';
import { AddComponent } from './add/add.component';
import { MainPresupuestoComponent } from './main-presupuesto/main-presupuesto.component';


const routes: Routes = [
  {
    path: '',
    component: PresupuestoComponent,
    children: [
      { path: '', redirectTo: 'index'},

      { path: 'index', component: MainPresupuestoComponent },

      { path: 'alerts', loadChildren: './add/alerts/alerts.module#AlertsModule'},

      { path: 'estadisticas', loadChildren: './estadisticas/estadisticas.module#EstadisticasModule'},

      // { path: 'notificacion/:pre', component: PresupuestoComponent },

      { path: ':type/calculadora/:pre/:cat/:subCat', component: CalculatorComponent },

      { path: ':type/calculadora/:pre/:cat', component: CalculatorComponent },

      { path: ':type/calculadora', component: CalculatorComponent },

      { path: ':type/editar-categoria', component: EditComponent },

      { path: ':type/agregar-categoria', component: CategoryAddComponent },

      { path: ':type', component: AddComponent },
      
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PresupuestoRoutingModule { }
