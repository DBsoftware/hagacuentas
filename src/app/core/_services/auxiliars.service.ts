import { Injectable } from '@angular/core';
import { of, BehaviorSubject } from 'rxjs';
import { Presupuesto } from '../store/presupuestos/presupuesto.interface';
import predeterminadas from '../_data/categories';
import predeterminadas2 from '../_data/categoriesAux';
import { Store } from '@ngrx/store';
import { AppStore } from '../store/store.interface';

@Injectable({
  providedIn: 'root'
})
export class AuxiliarsService {
  meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre']
  predeterminados = predeterminadas
  emitMovimiento = new BehaviorSubject<any>('')
  emitCategoria = new BehaviorSubject<any>(null)

  constructor(private store$: Store<AppStore>,) { }

  fijoInceptionOne(e, fecha){
    return (e.fijo == 1) ? 
          ({...e, fecha_movimiento: fecha}): e
  }

  emitirValor(data: any){
    this.emitMovimiento.next(data);
  }

  getData(){
    return this.emitMovimiento.asObservable()
  }

  emitirCategoria(data: any){
    this.emitCategoria.next(data);
  }

  getCategoria(){
    return this.emitCategoria.asObservable()
  }

  getMonth(month) {
    return this.meses[Number(month)]
  }

  procesarDatos(datos, fecha){
    let ingresos = 0
    let gastos = 0
    let movimientosCustoms = datos.categorias
        .map(data => data.subcategorias)
        .filter(res => res!= undefined && !!res && res.length > 0)
        .map(res => res.filter(res => res.movimientos != undefined && !!res.movimientos && res.movimientos.length > 0))
        .filter(res => res.length > 0)
        .reduce((prev, next) => prev.concat(next),[])
        .map(res => res.movimientos)
        .reduce((prev, next) => prev.concat(next),[])
        ingresos = movimientosCustoms.filter(res => this.getTipo(res.tipo) === 1)
                    .map(a => this.fijoInceptionOne(a, fecha))
                    .filter(e => this.verifyDateMonthYear(e, fecha))
                    .filter((e,i,arr) => arr.every(e => e.fijo == 0) ?  true: (e.fijo == 1))
                    .map(data => this.cleanNumber(data.valor)).reduce((a,b)=> a+b,0)
        gastos = movimientosCustoms.filter(res => this.getTipo(res.tipo) !== 1 )
                    .map(a => this.fijoInceptionOne(a, fecha))
                    .filter(e => this.verifyDateMonthYear(e, fecha))
                    .filter((e,i,arr) => arr.every(e => e.fijo == 0) ?  true: (e.fijo == 1))
                  .map(data => this.cleanNumber(data.valor)).reduce((a,b)=> a+b,0)
      return of({balance: ingresos - gastos,
        totalGastos: gastos,
        totalIngresos: ingresos})
  } 



 

  cleanNumber (str) {
    if (typeof str === "string") {
      return Number(str.trim().replace(',', ''))
    }
    return str
  }

  cleanArreglos(arreglo){
    arreglo.forEach(element => {
      if (element.id == 17) {
        element.subcategorias = []
      } else
      element.subcategorias = element.subcategorias.map(e =>({...e, movimientos : []}))
    });
    return arreglo
  }

  arrayToObject(arreglo){
    arreglo = this.cleanArreglos(arreglo)
    const objeto= {}
    arreglo.forEach(element => {
      objeto[`${element.id}`] = element
    });
    return objeto;
  }

  ajustarMovimientosPredeterminados(pre) {
    let i = this.arrayToObject([...predeterminadas['ingresos']])
    let g = this.arrayToObject([...predeterminadas['gastos']])
    pre = {...pre}
    let base = pre.movimientosPredeterminados.map(e => ({...e.subcategoria, movimientos: this.addMovimientoPredeterminado(e.subcategoria.movimientos,e)}));
    base.forEach(e => {
      if (e.id_categoria === 1 || e.id_categoria === 17) {
        if (e.id_categoria === 17) {
          i[`${e.id_categoria}`].subcategorias.push(e)
        }
        else {
          i[`${e.id_categoria}`].subcategorias = i[`${e.id_categoria}`].subcategorias.map(deep => (deep.id == e.id) ? ({...deep, ...e}): deep)
        }
      } else {
        g[`${e.id_categoria}`].subcategorias = g[`${e.id_categoria}`].subcategorias.map(deep => (deep.id == e.id) ? ({...deep, ...e}): deep)
      }
    })
    pre.categorias = [...pre.categorias,...Object.values(i),...Object.values(g)]
    return pre
  }

  addMovimientoPredeterminado(arreglo, movimiento) {
    console.log('esto es undefined',arreglo)
    return arreglo.every(e => e.id != movimiento.id) ? 
    ([...arreglo, movimiento]):
    arreglo.map(e => {
      if (e.id == movimiento.id) {
        return movimiento;
      }
      return e;
    })
  }


  quitarTilde(str) {
    const chars={
      "á":"a", "é":"e", "í":"i", "ó":"o", "ú":"u",
      "à":"a", "è":"e", "ì":"i", "ò":"o", "ù":"u", "ñ":"n",
      "Á":"A", "É":"E", "Í":"I", "Ó":"O", "Ú":"U",
      "À":"A", "È":"E", "Ì":"I", "Ò":"O", "Ù":"U", "Ñ":"N"}
    const expr=/[áàéèíìóòúùñ]/ig;
    return str.replace(expr,(e) =>chars[e]);
  }

  sacarBalance(categoria, fecha) {

    if (!categoria.subcategorias) {
      if (categoria.movimientos) {
        if (categoria.movimientos.length > 0) {
          let contenedor = categoria.movimientos.map(e => this.fijoInceptionOne(e, fecha)).filter(e => this.verifyDateMonthYear(e, fecha)).filter((e,i,arr) => arr.every(e => e.fijo == 0) ?  true: (e.fijo == 1))
          return this.cleanNumber( contenedor.length > 0? contenedor[0].valor: 0)
        }
      }
    }
    
    if (categoria.subcategorias && categoria.subcategorias.length > 0 && fecha != undefined) {
      let subcategorias = categoria.subcategorias.filter(e => !!e.movimientos && e.movimientos != undefined && e.movimientos.length > 0);
      if (subcategorias.length > 0)
      return subcategorias.map(e => e.movimientos).flat().map(e => this.fijoInceptionOne(e, fecha))
      .filter(e =>this.verifyDateMonthYear(e, fecha)).filter((e,i,arr) => arr.every(e => e.fijo == 0) ?  true: (e.fijo == 1))
            .map(({valor}: any) => this.cleanNumber(valor)).reduce((a,b)=> a+b,0)
    }
    return 0
  }

  sacarMovimiento(categoria, fecha) {
    if (!categoria.subcategorias) {
      if (categoria.movimientos) {
        if (categoria.movimientos.length > 0) {
          let contenedor = categoria.movimientos.map(e => this.fijoInceptionOne(e, fecha)).filter(e => this.verifyDateMonthYear(e, fecha))
          return  contenedor.length > 0? contenedor[0]: {}
        }
      }
    }
    return {}
  }

  verifyDateMonthYear(e, fecha){
    return (new Date(e.fecha_movimiento).getMonth() === new Date(fecha).getMonth()) &&  (new Date(e.fecha_movimiento).getFullYear() === new Date(fecha).getFullYear())
  }

  correctCountryCode(key){
    switch (key) {
      case 'CR':
        return'CRC'
      case 'CRC':
        return'CRC'
      case 'SV':
        return'US'
      default:
        return 'COP';
    }
  }

  addSubIngresos(arreglo:any, subcategoria) {
    predeterminadas['ingresos'][1]
    if (arreglo.every(e => e.id != 17)) {
      arreglo.push({...predeterminadas2['ingresos'][1]})
    }
    arreglo.forEach(element => {
      if (element.id === subcategoria.id_categoria) {
        element.subcategorias.push(subcategoria)
      }
    });
  
    return arreglo
  }


  addSubGasto(arreglo:any, subcategoria ) {
    arreglo = arreglo.map(e => {
      if (e.id == subcategoria.id_categoria) {
        e = {...e, subcategorias: [...e.subcategorias, subcategoria]}
      }
      return e
    })
    return arreglo
  }


  changeId(arreglo, id, tempID) {
    arreglo = arreglo.map(e => {
      if (e.id == tempID){
        e.id = id
        return ({...e, subcategorias: []})
      } 
      return e
    })
    return arreglo
  }

  getTipo(tipo){
    if (typeof tipo === 'number') {
      return tipo
    } else
      return tipo.data[0]
  }

  changeSubIdofCat(arreglo, oldId, id, id_categoria){
      return arreglo.map(e => {
        return (e.id == id_categoria) ?
          ({...e, subcategorias: e.subcategorias.map(sub => sub.id == oldId ? ({...sub, id}): sub)}):
          e  
      })
  }
  changeSubId(arreglo, oldId, id){
      return arreglo.map(e => e.id == oldId ? ({...e, id}): e)
  }

  


}
