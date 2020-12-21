import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../../../../core/_services';
import { AppStore } from '../../../../../core/store/store.interface';
import { Store } from '@ngrx/store';
import { selectCategoriasGastos, selectFecha } from '../../../../../core/store/presupuestos';
import { tap, map, switchMap } from 'rxjs/operators';
import { AuxiliarsService } from '../../../../../core/_services/auxiliars.service';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import icons from '../../add/icons.base64';
import generalIcons from "../../../../../core/_data/general_icons";
import newIconsGastos from '../../add/new_gastos';
import newIconsingresos from '../../add/new_ingresos';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-gastos-por-categoria',
  templateUrl: './gastos-por-categoria.component.html',
  styleUrls: ['./gastos-por-categoria.component.scss']
})
export class GastosPorCategoriaComponent implements OnInit {
  Iconos = icons
  newIconosG = newIconsGastos
  newIconosI = newIconsingresos
  generalIcons = generalIcons
  categorias;
  lang
  categSelected
  fecha
  chart = {
    doughnutChartLabels : [],
    doughnutChartData  : []
  }
  type= 'gastos'
  public doughnutChartType: ChartType = 'doughnut';
  options: any = {
    legend: { position: 'top' }
  }
  
  onSelect(event) {
  }

  constructor(
    _seo: SeoService,
    private store$: Store<AppStore>,
    private auxiliars: AuxiliarsService
  ) {
     _seo.addTags('Estadisticas_gastos_por_categoría') 
     this.categorias = this.store$.select(selectFecha).pipe(tap(fecha => this.fecha = fecha))
     .pipe(switchMap(res => store$.select(selectCategoriasGastos)
     .pipe(
       map(res => res.filter(data => data.subcategorias.length > 0)),
       map(res => res.map(this.filterMovimientos)),
       map(res => res.filter(data => data.subcategorias.length > 0)),
       map(res => res.filter(data => auxiliars.sacarBalance(data, this.fecha) > 0)),
       tap(res => {
         if (res.length > 0) {
           this.activeChart(res[0])
         }
       }))))
     
       this.lang = localStorage.getItem('country') || 'CO';
    }

    filterMovimientos(Categoria) {
      return {...Categoria, subcategorias: Categoria.subcategorias.filter(data => data.movimientos.length > 0)}
    }

    imgParser(img){
      img = this.auxiliars.quitarTilde(img)
      if (!img.includes('new')) 
          return this.Iconos[img.trim().replace('_off', '')]
      return this.newIconosG[img.replace('new/','')] 
    }

  ngOnInit() {
    
  }

  validations() {

  }

  loadChart(label = false, labelCenter = true) {

    
  }


  activeChart(categ) {
    this.chart.doughnutChartData = []
    this.chart.doughnutChartLabels = []
    this.categSelected = categ.id;
    categ.subcategorias.map(e => {
                    this.chart.doughnutChartLabels.push(e.nombre);
                    this.chart.doughnutChartData
                        .push(e.movimientos
                              .filter(e => this.auxiliars.verifyDateMonthYear(e, this.fecha))
                              .map(e => e.valor).reduce((a,b) => ( this.auxiliars.cleanNumber(a) + this.auxiliars.cleanNumber(b)),0))
                        return e;
                  })
    this.chart.doughnutChartData = this.chart.doughnutChartData.filter((e,i) => {
      if (e == 0) 
          this.chart.doughnutChartLabels.splice(i,1)
      return e > 0;
      })

  }


  ngOnDestroy(): void {

  }

}
