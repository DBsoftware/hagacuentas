import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstadisticasRoutingModule } from './estadisticas.routes';
import { CompararComponent } from './comparar/comparar.component';
import { MovimientosComponent } from './movimientos/movimientos.component';
import { GastosPorCategoriaComponent } from './gastos-por-categoria/gastos-por-categoria.component';
import { ResumenComponent } from './resumen/resumen.component';
import { EstadisticasComponent } from './estadisticas.component';
import { MaterialModule } from '../../../../app.material.module';
import { CabeceraModule } from '../cabecera/cabecera.module';
import { ChartsModule } from 'ng2-charts';
import { ShareAppModule } from '../../../shared/share.module';
import { DetalladoComponent } from './comparar/detallado/detallado.component';
import { GraficaComponent } from './comparar/grafica/grafica.component';

@NgModule({
  declarations: [
    EstadisticasComponent,
    ResumenComponent,
    GastosPorCategoriaComponent,
    MovimientosComponent,
    CompararComponent,
    DetalladoComponent,
    GraficaComponent
  ],
  imports: [
    CommonModule,
    EstadisticasRoutingModule,
    ShareAppModule,
    MaterialModule,
    CabeceraModule,
    ChartsModule,
    MaterialModule
  ]
})
export class EstadisticasModule { }
