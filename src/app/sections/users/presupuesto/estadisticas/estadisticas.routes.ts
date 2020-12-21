import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstadisticasComponent } from './estadisticas.component';
import { ResumenComponent } from './resumen/resumen.component';
import { GastosPorCategoriaComponent } from './gastos-por-categoria/gastos-por-categoria.component';
import { MovimientosComponent } from './movimientos/movimientos.component';
import { CompararComponent } from './comparar/comparar.component';

const routes: Routes = [
  {
    path: '',
    component: EstadisticasComponent,
    children: [
      { path: 'resumen', component: ResumenComponent },
      { path: 'gastos-por-categoria', component: GastosPorCategoriaComponent },
      { path: 'movimientos', component: MovimientosComponent },
      { path: 'comparar', component: CompararComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstadisticasRoutingModule { }
