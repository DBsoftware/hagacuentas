import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { map, switchMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import categorias from '../../../../../../core/_data/categoriesAux';
import { AppStore } from '../../../../../../core/store/store.interface';
import { selectFecha, selectsubCategoriasIngresos, selectCategoriasGastos } from '../../../../../../core/store/presupuestos';
import { AuxiliarsService } from '../../../../../../core/_services/auxiliars.service';

@Component({
  selector: 'app-detallado',
  templateUrl: './detallado.component.html',
  styleUrls: ['./detallado.component.scss']
})
export class DetalladoComponent implements OnInit {
  activeOpt
  labels = []
  ingresosTable
  gastosTable
  fecha
  mes
  ingresos = categorias['ingresos']
  lang
  constructor(private store$: Store<AppStore>,
    private changeDetector : ChangeDetectorRef, 
    public auxiliars: AuxiliarsService) {
    this.lang = localStorage.getItem('country') || 'CO';
  }

  ngAfterViewChecked(){
    this.changeDetector.detectChanges();
  }

  ngOnInit() {
    
    this.cleanIngresos()
    this.ingresosTable = this.store$.select(selectFecha)
    .pipe(tap(fecha => this.fecha = fecha), 
    tap(fecha => {this.labels = [];this.setFechas(fecha, 2)} ), 
    tap(fecha => this.mes = new Date(this.fecha).getMonth()))
    .pipe(switchMap(e => this.store$.select(selectsubCategoriasIngresos)
    .pipe(
      map(this.filtradoDeMovimientos),
      map(  res => res.map(e => ({id_categoria: e.id_categoria,
        nombre: e.nombre,
        imagen: e.imagen, 
        total: e.movimientos.map(e => ({fecha: e.fecha_movimiento,
        valor:this.auxiliars.cleanNumber(e.valor)}))}))
      ),                                                        
      map(res => res.map(e => ({...e, total: this.acomodarDatos(e.total)}))),
      map(res => res.filter(e => e.total.reduce((a,b)=> a+b,0) > 0)),
      map(res => this.configurarIngresos(res).filter(res => res.subcategorias.length > 0)), 
      map(res => this.preCalcularTotales(res)))))

    this.gastosTable = this.store$.select(selectCategoriasGastos).pipe(
        map(e=> e.filter(element => element.subcategorias.length > 0)),
        map(e => e.map(element => ({...element, subcategorias: element.subcategorias.filter(a => a.movimientos.length > 0)}))),
        map(e=> e.filter(element => element.subcategorias.length > 0)),
        map(res =>  res.map(b => ({
            ...b,
            subcategorias:b.subcategorias
            .map(e => ({nombre: e.nombre,
            imagen: e.imagen, 
            total: e.movimientos.map(e => ({fecha: e.fecha_movimiento, valor:this.auxiliars.cleanNumber(e.valor)}))}))
          }))
        ),
        map(res => res.map(b => ({...b,subcategorias:b.subcategorias.map(e => ({...e, total: this.acomodarDatos(e.total)}))}))),
        map(res => res.map(b => ({...b, subcategorias:b.subcategorias.filter(c => c.total.reduce((a,b)=> a+b,0) > 0)}))),
        map(res => res.filter(el => el.subcategorias.length > 0)),
        map(res => this.preCalcularTotales(res)))     
  }

  setFechas(fecha, qty) {
    this.labels.push(this.transformarFecha(fecha))
    fecha = this.restarMes(fecha,1) 
    if (qty === 0)
      this.labels = this.labels.reverse()
    else
      this.setFechas(fecha, qty -1)
  }

  acomodarDatos(arreglo){
    const arregloResultado = [0,0,0]
    arreglo.forEach(e => {
        switch (this.transformarFecha(e.fecha)) {
          case (this.transformarFecha(this.fecha)):
            arregloResultado[2] += e.valor ? e.valor: 0
            break;
          case (this.transformarFecha(this.restarMes2(1))):
            arregloResultado[1] += e.valor ? e.valor: 0
            break;
          case (this.transformarFecha(this.restarMes2(2))):
            arregloResultado[0] += e.valor ? e.valor: 0
            break;
        }
    });
    return arregloResultado
  }

  transformarFecha(date){
    let formatDate = new Date(date).toISOString().split('T')[0].slice(0,-3);
    return `${formatDate.split('-')[1]} / ${formatDate.split('-')[0]}`
  }

  restarMes(date, num){
    let aux = new Date(date)
    aux.setMonth(new Date(date).getMonth() - num)
    return aux
  }

  restarMes2(num){
    let aux = new Date(this.fecha)
    aux.setMonth(new Date(this.fecha).getMonth() - num)
    return aux
  }

  configurarIngresos(arregloSubcategorias){
    this.cleanIngresos()
    arregloSubcategorias.forEach(element => {
      this.ingresos[element.id_categoria == 1 ? 0 : 1].subcategorias.push(element)
    });
    return this.ingresos
  }

  cleanIngresos() {
    this.ingresos.forEach(element => {
      element.subcategorias = []
    });
  }

  preCalcularTotales(categorias){
    if(categorias.length > 0){
      let _this = this
      return categorias.map(e => ({...e, total: _this.calcularTotales(e.subcategorias)}));
    }
    return categorias
  }

  calcularTotales(subcategorias){
    let arregloTotales = [0,0,0]
    subcategorias.forEach((e) => {
      e.total.forEach((f,i) => {
        arregloTotales[i] += f
      })
    });
    return arregloTotales
  }

  validCateg() {}


// metodos auxiliares para observables

filtradoDeMovimientos(res){
  return res.filter(e => !!e.movimientos && e.movimientos != undefined && e.movimientos.length > 0)
}

acomodacionInfoIngresos(res){

}

acomodacionInfoGastos(res){

}

}
