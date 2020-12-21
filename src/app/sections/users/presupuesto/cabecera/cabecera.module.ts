import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CabeceraComponent } from './cabecera.component';
import { MaterialModule } from '../../../../app.material.module';

@NgModule({
  declarations: [CabeceraComponent],
  exports: [CabeceraComponent],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class CabeceraModule { }
