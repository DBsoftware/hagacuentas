import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PresupuestoComponent } from './presupuesto.component';
import { EstadisticasModule } from './estadisticas/estadisticas.module';
import { FooterComponent } from './footer/footer.component';
import { AlertsComponent } from './add/alerts/alerts.component';
import { AddAlertComponent } from './add/alerts/add/add.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { EditComponent } from './edit/edit.component';
import { CategoryAddComponent } from './add/category-add/category-add.component';
import { AddComponent } from './add/add.component';
import { MainPresupuestoComponent } from './main-presupuesto/main-presupuesto.component';
import { PresupuestoRoutingModule } from './presupuesto.routes';
import { ShareAppModule } from '../../shared/share.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../app.material.module';
import { CabeceraModule } from './cabecera/cabecera.module';
import { TiempoPickerComponent } from './calculator/tiempo-picker/tiempo-picker.component';
import {NgbTimepickerModule} from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    PresupuestoComponent,
    FooterComponent,
    AlertsComponent,
    AddAlertComponent,
    CalculatorComponent,
    EditComponent,
    CategoryAddComponent,
    AddComponent,
    MainPresupuestoComponent,
    AddAlertComponent,
    TiempoPickerComponent
  ],
  imports: [
    CommonModule,
    EstadisticasModule,
    PresupuestoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ShareAppModule,
    MaterialModule,
    CabeceraModule,
    NgbTimepickerModule
  ], 
  entryComponents: [TiempoPickerComponent]
})
export class PresupuestoModule { }
