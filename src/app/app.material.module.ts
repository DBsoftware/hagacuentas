import {MatDatepickerModule, MatNativeDateModule, MatExpansionModule} from '@angular/material';
import { NgModule } from '@angular/core';


@NgModule({
  declarations: [],
  imports: [MatDatepickerModule, MatNativeDateModule, MatExpansionModule],
  exports: [MatDatepickerModule, MatNativeDateModule, MatExpansionModule]
})
export class MaterialModule { }