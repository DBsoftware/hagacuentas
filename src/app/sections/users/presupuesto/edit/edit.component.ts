import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SeoService } from '../../../../core/_services';
import generalIcons from '../../../../core/_data/general_icons';
import { AuxiliarsService } from '../../../../core/_services/auxiliars.service';
import {Location} from '@angular/common';
import { takeUntilDestroy } from 'take-until-destroy';
import newIconsGastos from '../add/new_gastos';
import newIconsingresos from '../add/new_ingresos';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {

  newIconosG = newIconsGastos
  newIconosI = newIconsingresos
  rojo = generalIcons.rojo
  gris= generalIcons.gris

  id;
  dataCateg:any = false;
  calendar = false;
  indexCateg;
  type

  constructor(
    private _route:ActivatedRoute,
    private auxiliars: AuxiliarsService,
    private location: Location,
    private _router: Router,
    _seo: SeoService,
  ) { 
    if (this._route.snapshot.paramMap.get("type") == 'gastos') {
      _seo.addTags('Editar_tipo_de_gastos_agregado')
    }
    this.type = this._route.snapshot.paramMap.get("type") == 'ingresos'
    this.auxiliars.getCategoria()
    .pipe(takeUntilDestroy(this))
    .subscribe(e => this.dataCateg = e)
  }

  ngOnInit() {

  }

  back(){
    this.location.back()
  }

  action(estado,index){

  }

  activeEdit(subCateg){

  }

  addSubCateg(){
    localStorage.setItem('id_categoria',this.dataCateg['id'])
    this._router.navigateByUrl(`/presupuesto/${this.type? 'ingresos': 'gastos'}/agregar-categoria`)
  }

  imgParser(img) {
    return this.type ? this.newIconosI[img.replace('new/','')] : this.newIconosG[img.replace('new/','')]
  }

  ngOnDestroy(): void {}


}
