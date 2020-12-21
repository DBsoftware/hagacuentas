import { Action, createReducer, on } from '@ngrx/store';
import { PresupuestoState,  presupuestoAdapter } from './presupuesto.adapter';

import { actions as PresupuestoActions } from './presupuesto.actions';


export function PresupuestoInitialState(): PresupuestoState {
  return presupuestoAdapter.getInitialState({selectedPresupuesto: null, loading: false, estadisticas: null, fecha: new Date().toISOString()});
}

const PresupuestoReducer = createReducer(
  PresupuestoInitialState(),
  on(PresupuestoActions.loadPresupuestoListSuccess, (state, { Presupuestos }) => presupuestoAdapter.addAll(Presupuestos, state)),
  
  on(PresupuestoActions.selectPresupuestoSuccess, (state, { presupuesto }) => ({...state, selectedPresupuesto: presupuesto})),

  on(PresupuestoActions.addSuccess, (state, { Presupuesto }) => presupuestoAdapter.addOne(Presupuesto, state)),

  on(PresupuestoActions.removeSuccess, (state, { id }) => presupuestoAdapter.removeOne(id, state)),

  on(PresupuestoActions.updateSuccess, (state, { Presupuesto }) => presupuestoAdapter.updateOne({ id: Presupuesto.id, changes: Presupuesto }, state)),

  on(PresupuestoActions.changePresupuestoSelected, (state, { key, value }) => ({...state, selectedPresupuesto: {...state.selectedPresupuesto, [key]: value}})),

  on(PresupuestoActions.changeStateLoading, (state, { estado }) => ({...state, loading: estado})),
  
  on(PresupuestoActions.setEstadisticas, (state, { estadisticas }) => ({...state, estadisticas})),

  on(PresupuestoActions.setMesFiltrado, (state, { fecha }) => ({...state, fecha})),

  on(PresupuestoActions.addSubcategoriaIngreso, (state, {subcategoria}) => ({...state, selectedPresupuesto: {...state.selectedPresupuesto, categorias: addSubIngresos(state.selectedPresupuesto.categorias,subcategoria)}})),
  
  on(PresupuestoActions.addCategoria, (state, {categoria}) => ({...state, selectedPresupuesto: {...state.selectedPresupuesto, categorias: [...state.selectedPresupuesto.categorias, categoria]}})),
  
  on(PresupuestoActions.addSubcategoriaGasto, (state, {subcategoria}) => ({...state, selectedPresupuesto: {...state.selectedPresupuesto, categorias: addSubGasto(state.selectedPresupuesto.categorias,subcategoria)}})),

  on(PresupuestoActions.changeCategoriaId, (state, {payload}) => ({...state, selectedPresupuesto: {...state.selectedPresupuesto, categorias: changeId(state.selectedPresupuesto.categorias,payload)}})),

  on(PresupuestoActions.addMovimiento, 
    (state, {movimiento}) => {
      return ({...state,
        selectedPresupuesto: {
                             ...state.selectedPresupuesto, 
                                categorias: addMovimiento([...state.selectedPresupuesto.categorias], (movimiento)),
                             movimientosPredeterminados: addMovimientoPredeterminado(state.selectedPresupuesto.movimientosPredeterminados, movimiento)
                           },
       })
    }),
  on(PresupuestoActions.changeMovementId,
    (state, {payload}) => {
      console.log('fuck this')
      return ({...state,
        selectedPresupuesto: {
                             ...state.selectedPresupuesto, 
                                categorias: changeMovimiento([...state.selectedPresupuesto.categorias], payload),
                             movimientosPredeterminados: changeMovimientoPredeterminado(state.selectedPresupuesto.movimientosPredeterminados, payload)
                           },
       })
    })
);

export function presupuestoReducer(state: PresupuestoState | undefined, action: Action) {
  return PresupuestoReducer(state, action);
}

export const getState = (state: PresupuestoState) => state;
export const getFecha = (state: PresupuestoState) => state.fecha;
export const getList = (state: PresupuestoState) => state.entities;
export const getEstadisticas = (state: PresupuestoState) => state.estadisticas;
export const getSelectedPresupuesto = (state: PresupuestoState) => state.selectedPresupuesto;
export const getSelectedPresupuestoMov = (state: PresupuestoState) => state.selectedPresupuesto.movimientosPredeterminados;
export const getSelectedPresupuestoCategorias = (state: any) => state.selectedPresupuesto.categorias;
export const getSelectedPresupuestoCategoriasIngresos = (state: any) => state.selectedPresupuesto.categorias.filter(res => !ValidateType(res['tipo']));
export const getSelectedPresupuestosubCategoriasIngresos = (state: any) => state.selectedPresupuesto.categorias.filter(res => !ValidateType(res['tipo'])).map(res => res['subcategorias']).flat() ;
export const getSelectedPresupuestoCategoriasGastos = (state: any) => state.selectedPresupuesto.categorias.filter(res => ValidateType(res['tipo']));
export const getLoadingState = (state: PresupuestoState) => state.loading;


function addSubIngresos(arreglo:any, subcategoria) {
  console.log('add sub ingreso', arreglo)
  return arreglo.map(element => {
    if (element.id === subcategoria.id_categoria) {
      console.log('la categoria', subcategoria)
      element.subcategorias.push(subcategoria)
    }
    return element
  });
}

function addSubGasto(arreglo:any, subcategoria ) {
  console.log('el de gasto', arreglo)
  return arreglo.map(e => {
    if (e.id == subcategoria.id_categoria) {
      console.log('la categoria', subcategoria)
      if (e.subcategorias.every(e => e.id != subcategoria.id)) {
        e = {...e, subcategorias: [...e.subcategorias, subcategoria]}
      }
    }
    return e
  })
}

function changeId(arreglo: any, payload){
  arreglo.forEach(element => {
    if (element.id == payload['tempId']) {
      element.id = payload['id']
    }
  });
  return arreglo
}

function ValidateType(variable:any) {
  if (typeof variable == 'number') {
    return variable == 0
  }
  return variable['data'][0] === 0
}

function addMovimiento(arreglo, movimiento) {
  arreglo = arreglo.map(e => {
    if (e.id == movimiento.id_categoria) {
      e.subcategorias = e.subcategorias.map(sub => {
        if (sub.id == movimiento.id_subcategoria) {
          sub.movimientos = addMovimientoPredeterminado(sub.movimientos, movimiento)
        }
        return sub
      })
    }
    return e
  })
  return arreglo
}

function addMovimientoPredeterminado(arreglo, movimiento) {
  console.log('add error', arreglo)
  return arreglo.every(e => e.id != movimiento.id) ? 
  ([...arreglo, movimiento]):
  arreglo.map(mov => {
    if (mov.id == movimiento.id) {
      return movimiento;
    }
    return mov;
  })
}
function changeMovimiento(arreglo, payload) {
  console.log('cambiar id',payload)
  arreglo = arreglo.map(e => {
    if (e.id == payload.id_categoria) {
      e.subcategorias = e.subcategorias.map(sub => {
        if (sub.id == payload.id_subcategoria) {
          sub.movimientos = changeMovimientoPredeterminado(sub.movimientos, payload)
        }
        return sub
      })
    }
    return e
  })
  return arreglo
}

function changeMovimientoPredeterminado(arreglo, payload) {
  return arreglo.map(mov => {
    if (mov.id == payload.id) {
      console.log('cambio predeterminado', arreglo)
      return {...mov, id: payload.newId };
    }
    return mov;
  })
}



