import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {SeoService } from '../../../../../core/_services';
import icons from '../icons.base64';
import generalIcons from "../../../../../core/_data/general_icons";
import newIconsGastos from '../new_gastos';
import newIconsingresos from '../new_ingresos';
import { AuxiliarsService } from '../../../../../core/_services/auxiliars.service';
import { takeUntilDestroy } from 'take-until-destroy';
import {Location} from '@angular/common';
import { Store } from '@ngrx/store';
import { AppStore } from '../../../../../core/store/store.interface';
import { selectsubCategoriasIngresos, selectCategoriasGastos } from '../../../../../core/store/presupuestos';
import { ApiCategoriasService } from '../../../../../core/_services/api_categorias.service';
import categorias from '../../../../../core/_data/categoriesAux';
import { take, tap } from 'rxjs/operators';


@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss']
})
export class CategoryAddComponent implements OnInit {
  rojo = generalIcons.rojo
  gris= generalIcons.gris
  diezisiete = categorias['ingresos'][1]
  Iconos = icons
  newIconosG = newIconsGastos
  newIconosI = newIconsingresos
  generalIcons = generalIcons
  type;
  iconoSeleccionado = '';
  @ViewChild('create',{static:false}) create: ElementRef;


  months = [];
  data: any = { month: "" };
  nameCateg: any = false;
  nameSubCateg: any = false;
  icons;
  iconCateg: any = false;
  iconSubCateg: any = false;
  finish = 0;
  showCheck = false;
  edit: any = false;
  dataCateg;
  subcategoriaGasto = false
  existente


  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private location: Location,
    private auxiliars: AuxiliarsService,
    private store$: Store<AppStore>,
    private apiCategoriasService:ApiCategoriasService,
    _seo: SeoService,
  ) {
    this.type = this._route.snapshot.paramMap.get("type") == 'ingresos'
    if (this.type) 
      _seo.addTags('Agregar_tipo_de_ingresos')
    else
      _seo.addTags('Agregar_tipo_de_gastos')
    this.store$.select(this.type ? selectsubCategoriasIngresos : selectCategoriasGastos)
    .pipe(takeUntilDestroy(this)).subscribe(res => this.existente = res)   
    if (localStorage.getItem('id_categoria')) {
      this.type = this.subcategoriaGasto = true
    }
  }
  
  ngOnInit() {
    this.icons = new Array( this.type ? 50: 45).fill('icono').map((e,i) => `${e}${i+1}` )

  }

  imgParser(icon){
    icon = icon.includes('_off') ? icon : `${icon}_off`;
    icon = this.iconoSeleccionado === icon ? icon.replace('_off','') : icon
    return this.type ? (this.subcategoriaGasto ? this.newIconosG[icon] : this.newIconosI[icon] ) : this.newIconosG[icon]
  }

  isValid(value) {
    return (this.iconoSeleccionado && value.length > 0) && this.doesExist(value)
  }

  createCategoria(value) {
    let objectToSave = {
      disponible: 'CO,CR,SV',
      label_paises: `[{"CO": "${value}","CR": "${value}","SV": "${value}"}]`,
      imagen: `new/${this.iconoSeleccionado}`,
      tipo: this.type ? (this.subcategoriaGasto ? 0:1): {data:[0]},
      estado: 1,
      id_app: Math.floor((Math.random() * 100) + 1),
      nombre: value,
      id_presupuesto: Number(localStorage.getItem('presupuestoSelected')),
    }
    if (this.isValid(value)) {
      if (this.type) {        
        this.apiCategoriasService.addSubcategoria({...objectToSave,
                                          id_categoria: this.type ? 
                                          (this.subcategoriaGasto ? localStorage.getItem('id_categoria') : 17) 
                                          : 17}, this.subcategoriaGasto)
        .pipe(take(1)).subscribe(() => this._router.navigateByUrl(`presupuesto/${this.type ? (this.subcategoriaGasto ? 'gastos': 'ingresos'): 'gastos'}`))
      } else{
        this.apiCategoriasService.addCategoria({...objectToSave, subcategorias: []})
        .pipe(take(1)).subscribe(res => {
          this.type = this.subcategoriaGasto = true
        })
      }
      this.create.nativeElement.value = ''
      this.iconoSeleccionado = ''
    }
  }


  doesExist(value) {
    return this.existente.every((e) => e !== value)
  }



  editValue() {

  }

  unfocus(e) {
  }

  ngOnDestroy(): void {
    this.iconoSeleccionado = ''
    localStorage.removeItem('id_categoria')
  }

  back() {
    this.location.back()
  }

}
