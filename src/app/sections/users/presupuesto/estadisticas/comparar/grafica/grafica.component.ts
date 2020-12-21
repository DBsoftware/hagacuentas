import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Label } from 'ng2-charts';
import { ChartType, ChartDataSets, ChartOptions } from 'chart.js';
import { AppStore } from '../../../../../../core/store/store.interface';
import { Store } from '@ngrx/store';
import { selectFecha, selectsubCategoriasIngresos, selectCategoriasGastos } from '../../../../../../core/store/presupuestos';
import { tap, switchMap, map } from 'rxjs/operators';
import { AuxiliarsService } from '../../../../../../core/_services/auxiliars.service';
import icons from '../../../add/icons.base64';
import newIconsGastos from '../../../add/new_gastos';
import newIconsingresos from '../../../add/new_ingresos';
import generalIcons from '../../../../../../core/_data/general_icons';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.scss']
})
export class GraficaComponent implements OnInit {
  Iconos = icons
  newIconosG = newIconsGastos
  newIconosI = newIconsingresos
  generalIcons = generalIcons
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  botonCatidad = false
  MovList
  barChartData: ChartDataSets[] = [
    { data: [34,45,56, 34,45,56], label: 'Series A' },
  ];
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  categoriaActiva
  loader
  subcategSelected
  lang;
  fecha
  mes
  anio
  activeTable

  constructor(
    public auxiliars: AuxiliarsService,
    private store$: Store<AppStore>,
    private changeDetector : ChangeDetectorRef 
  ) {
    this.lang = localStorage.getItem('country') || 'CO';
  }

  ngAfterViewChecked(){
    this.changeDetector.detectChanges();
  }
  ngOnInit() {
    this.MovList = this.store$.select(selectFecha).pipe(tap(fecha => this.fecha = fecha), tap(fecha => this.mes = new Date(this.fecha).getMonth()))
              .pipe(switchMap(e => this.store$.select(selectsubCategoriasIngresos)
              .pipe(
                map(res => res.filter(e => !!e.movimientos && e.movimientos != undefined && e.movimientos.length > 0)),
                map(res => res.map(e => ({nombre: e.nombre,
                                          imagen: e.imagen, 
                                          total: e.movimientos.map(e => ({fecha: e.fecha_movimiento,
                                                                          valor:this.auxiliars.cleanNumber(e.valor)}))}))),
                map(res => res.map(e => ({...e, total: this.acomodarDatos(e.total)}))),
                switchMap(res1 => this.store$.select(selectCategoriasGastos).pipe(
                  map(e=> e.filter(element => element.subcategorias.length > 0)
                          .map(element => ({...element,
                                            movimientos: element.subcategorias.map(e => e.movimientos).flat()}))),
                  map(res => res.filter(e => !!e.movimientos && e.movimientos != undefined && e.movimientos.length > 0)),
                  map(res => res.map(e => ({nombre: e.nombre,
                                            imagen: e.imagen, 
                                            total: e.movimientos.map(e => ({fecha: e.fecha_movimiento, valor:this.auxiliars.cleanNumber(e.valor)}))}))),
                  map(res => res.map(e => ({...e, total: this.acomodarDatos(e.total)}))),
                  map( e => [...res1, ...e])) ),
                map(data => data.filter(e => e.total.reduce((a,b)=> a+b,0) > 0)),
                tap(e => {
                  if (e.length > 0) {
                    this.categoriaActiva = e[0]
                    this.changeOpt(3)
                  }
                })
                 )))           
  }
  changeOpt(n) {
    this.barChartLabels = []
    if (n === 6) {
      this.botonCatidad = false
      this.adjustMes(this.mes, 5)
      this.barChartData[0].data = this.categoriaActiva.total
    }else{
      this.botonCatidad = true
      this.adjustMes(this.mes, 2)
      this.barChartData[0].data = this.categoriaActiva.total.slice(3)
    }
    this.barChartData[0].label = this.categoriaActiva.nombre
  }
  adjustMes(mes, qty) {
    this.barChartLabels.push(this.auxiliars.getMonth(mes))
    mes -= 1
    if (qty === 0)
      this.barChartLabels = this.barChartLabels.reverse()
    else
      this.adjustMes((mes < 0 ? 11 : mes), qty -1)
  }

  acomodarDatos(arreglo){
    const arregloResultado = [0,0,0,0,0,0]
    arreglo.forEach(e => {
        switch (this.transformarFecha(e.fecha)) {
          case (this.transformarFecha(this.fecha)):
            arregloResultado[5] +=  e.valor ? e.valor: 0
            break;
          case (this.transformarFecha(this.restarMes(1))):
            arregloResultado[4] += e.valor ? e.valor: 0
            break;
          case (this.transformarFecha(this.restarMes(2)) ):
            arregloResultado[3] += e.valor ? e.valor: 0
            break;
          case (this.transformarFecha(this.restarMes(3))):
            arregloResultado[2] += e.valor ? e.valor: 0
            break;
          case (this.transformarFecha(this.restarMes(4))):
            arregloResultado[1] += e.valor ? e.valor: 0
            break;
          case (this.transformarFecha(this.restarMes(5))):
            arregloResultado[0] += e.valor ? e.valor: 0
            break;
        }
    });
    return arregloResultado
  }

  transformarFecha(date){
    return new Date(date).toISOString().split('T')[0].slice(0,-3)
  }

  restarMes(num){
    let aux = new Date(this.fecha)
    aux.setMonth(new Date(this.fecha).getMonth() - num)
    return aux
  }

  imgParser(categoria){
    categoria.imagen = categoria.imagen.replace('_off','')
    let img = this.auxiliars.quitarTilde(categoria.imagen)
    if (!img.includes('new'))
      return  this.Iconos[img.trim()]
    return categoria.tipo === 1 ? this.newIconosI[img.replace('new/','')] :
                                  this.newIconosG[img.replace('new/','')]
  }
  activeCateg(obj) {
    this.categoriaActiva = obj
    this.changeOpt(3)
  }

}
