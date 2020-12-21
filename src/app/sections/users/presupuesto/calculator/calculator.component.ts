import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SeoService } from '../../../../core/_services';
import {Location} from '@angular/common';
import icons from "./iconosCalculadora";
import iconosAplicacion from "../../../../core/_data/general_icons";
import { Store } from '@ngrx/store';
import { AppStore } from '../../../../core/store/store.interface';
import { AuxiliarsService } from '../../../../core/_services/auxiliars.service';
import base64 from '../add/icons.base64';
import generalIcons from "../../../../core/_data/general_icons";
import newIconsGastos from '../add/new_gastos';
import newIconsingresos from '../add/new_ingresos';
import { MatDatepicker } from '@angular/material';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TiempoPickerComponent } from './tiempo-picker/tiempo-picker.component';
import { Movimiento } from './imovimiento';
import { take, tap } from 'rxjs/operators';
import { ApiMovimientosService } from '../../../../core/_services/api_movimiento.service';
import { actions } from '../../../../core/store/presupuestos';


export const accionesDeCalculadora = {
  suma: (val1, val2) => Number(val1) + Number(val2),
  resta: (val1, val2) => Number(val1) - Number(val2),
  multiplicaion: (val1, val2) => Number(val1) * Number(val2),
  division: (val1, val2) => Number(val1) / Number(val2),
}
@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  Iconos = base64
  newIconosG = newIconsGastos
  newIconosI = newIconsingresos
  generalIcons = generalIcons
  nota = false;
  fijo = false;
  iconos = icons
  iconsApp = iconosAplicacion
  operando: boolean
  operacion: string
  calculadoraData ={
    valorAlmacenado: '',
    valorDisplay: '0'
  }
  valor = ' ';
  lang;
  nombreCategoria
  categoria;
  subcategoria;
  type
  condition;
  @ViewChild('picker', {static: false}) datePicker: MatDatepicker<any>;
  minDate = new Date(2009, 0, 1);
  maxDate = new Date(2029, 11, 31);
  movimiento:Movimiento = {
    descripcion: '',
    fijo: 0,
    fecha_creacion: new Date().toISOString(),
    fecha_movimiento:null,
    id_subcategoria: JSON.parse(localStorage.getItem('subCategoria'))['id'],
    id_app: Math.floor((Math.random() * 100) + 1),
    id_presupuesto: Number(localStorage.getItem('presupuestoSelected')),
    tipo: 0,
    valor: this.calculadoraData.valorDisplay
  };

  constructor(
    private _route: ActivatedRoute,
    private location: Location,
    private auxiliars: AuxiliarsService,
    _seo: SeoService,
    private apiMovimientosService: ApiMovimientosService,
    private modalService: NgbModal,
    private _router:Router,
    private store$: Store<AppStore>,
  ) {
    this.type = this._route.snapshot.paramMap.get("type");
    (this.type == 'ingresos') ?
      _seo.addTags('Valor_de_ingreso_del_presupuesto'):
      _seo.addTags('Valor_de_gastos_del_presupuesto')
    this.lang = localStorage.getItem('country') || 'CO';
    this.categoria = localStorage.getItem('categoria') ? JSON.parse(localStorage.getItem('categoria')): null;
    this.subcategoria = localStorage.getItem('subCategoria') ? JSON.parse(localStorage.getItem('subCategoria')): null;
    this.movimiento = {...this.movimiento, ...(JSON.parse(localStorage.getItem('movimiento')))}
  }
  
  ngOnInit() {
    this.calculadoraData.valorDisplay = localStorage.getItem('valor')? this.auxiliars.cleanNumber(localStorage.getItem('valor'))  : '' 

  }

  open() {
    this.modalService.open(TiempoPickerComponent, { centered: true});
  }

  ngOnDestroy(): void {
    localStorage.removeItem('categoria')
    localStorage.removeItem('subCategoria')
    localStorage.removeItem('valor')
    localStorage.removeItem('id_movimiento')
  }

  async getColorImg(img) {
 
  }

  imgParser(categoria){

    categoria.imagen = categoria.imagen.replace('_off','')
    let img = this.auxiliars.quitarTilde(categoria.imagen)
    if (!img.includes('new')) {
      return this.Iconos[img.trim()] ? this.Iconos[img.trim()] :  this.Iconos[img.trim().replace('_off','')]
    }
    return this.type.includes('ingresos') ? this.newIconosI[img.replace('new/','')] :
                                            this.newIconosG[img.replace('new/','')]
  }

  validadorNota(){
    return this.movimiento.descripcion.length > 0 ? 'on':'gray'
  }

  clickSlide(tgt) {
    this.movimiento.fijo = this.movimiento.fijo == 1 ? 0: 1
  }

  save() {
    if (localStorage.getItem('id_movimiento') && localStorage.getItem('id_movimiento')!== '0') {
      this.movimiento['id'] = localStorage.getItem('id_movimiento')
    }
    // this.movimiento.fijo =  this.fijo ? 1 : 0;
    this.movimiento.valor = `${Number(this.calculadoraData.valorDisplay)}`
    this.movimiento.tipo = this.type == 'ingresos' ? 1: 0
    this.movimiento['subcategoria'] =  JSON.parse(localStorage.getItem('subCategoria'))
    this.apiMovimientosService.addMovimientos(this.movimiento).pipe(take(1)).subscribe(e => {
    this.back()
    })
 
  }


  back() {
    this.location.back();
  }


  openCalendar(carrefour){
    this.condition = carrefour;
    if (carrefour) {
      this.datePicker.startView = 'month'
    } else {
      this.datePicker.startView = 'year'
    }
    this.datePicker.open()
  }

  monthSelectedHandler(evt){ 
    // let datePickerFirstVAlue = this.datePicker._selected 
    if (!this.condition) {
      this.movimiento.fecha_movimiento= new Date(evt).toISOString()
      this.datePicker.close()
    }
  }

  oncloseCalendar() {
    if (this.condition) {
      this.open()   
    }
  }

  mesSeleccionado() {
    return this.movimiento.fecha_movimiento != null ? 'on':'gray'
  }

  /// Metodos de Calculadora

  itemSelect(str) {
    if (this.operando) {
      this.calculadoraData.valorDisplay = str
      this.operando = !this.operando
    }
    else {
      if (this.calculadoraData.valorDisplay === '0') {
        this.calculadoraData.valorDisplay = str
      } else
        this.calculadoraData.valorDisplay += str 
    }
  }

  engatillarCalculo(action) {
    if (this.calculadoraData.valorAlmacenado.length > 0) 
      this.resolver()
    else
      this.calculadoraData.valorAlmacenado = this.calculadoraData.valorDisplay;
    this.operando = true
    this.operacion = action
  }

  resolver(){
    if (this.operacion) {
      const {valorAlmacenado, valorDisplay} = this.calculadoraData
      this.calculadoraData.valorDisplay = `${accionesDeCalculadora[this.operacion](this.auxiliars.cleanNumber(valorAlmacenado) , this.auxiliars.cleanNumber(valorDisplay))}`;
      this.calculadoraData.valorAlmacenado = ''
      this.operacion = null
      // this.operando = true
    }
  }
  
  reset() {
    this.calculadoraData.valorDisplay = '0'
    this.calculadoraData.valorAlmacenado = ''
  }

  del(){
    if (this.calculadoraData.valorDisplay.length < 2) {
      this.calculadoraData.valorDisplay = '0'
    } else 
      this.calculadoraData.valorDisplay = this.calculadoraData.valorDisplay.toString().substring(0, this.calculadoraData.valorDisplay.toString().length -1)
  }


  retornarNumero(val){
      return Number(val)
  }

  hasDecimals(value){
    return `${value}`.includes('.')
  }



}
