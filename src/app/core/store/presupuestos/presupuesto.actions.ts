import { createAction, props } from '@ngrx/store';

import { PresupuestoList, Presupuesto, Estadisticas } from './presupuesto.interface';

export enum presupuestoActionTypes {
  ADD = '[Presupuesto] Add',
  ADD_SUCCESS = '[Presupuesto] Add success',
  ADD_FAILED = '[Presupuesto] Add failed',
  LOAD_PRESUPUESTOS = '[Presupuesto] Load Presupuesto',
  LOAD_PRESUPUESTOS_SUCCESS = '[Presupuesto] Load Presupuesto success',
  LOAD_PRESUPUESTOS_FAILED = '[Presupuesto] Load Presupuesto failed',
  UPDATE = '[Presupuesto] Update',
  UPDATE_SUCCESS = '[Presupuesto] Update success',
  UPDATE_FAILED = '[Presupuesto] Update failed',
  REMOVE = '[Presupuesto] Delete',
  REMOVE_SUCCESS = '[Presupuesto] Delete success',
  REMOVE_FAILED = '[Presupuesto] Delete failed',
  SELECT_PRESUPUESTO = '[Presupuesto] Select presupuesto',
  SELECT_PRESUPUESTO_SUCCESS = '[Presupuesto] Select presupuesto success',
  SELECT_PRESUPUESTOS_FAILED = '[Presupuesto] Select Presupuesto failed',
  CHANGE_PRESUPUESTO_SELECTED = '[Presupuesto] Select presupuesto',
  CHANGE_STATE_LOADING = '[Presupuesto] Cambiar estado de loading',
  SET_ESTADISTICAS = '[Presupuesto] Establecer Estadisticas',
  SET_FECHA_FILTRADO = '[Presupuesto] Establecer Fecha de filtrado',
  ADD_CATEGORIA = '[Presupuesto - Categoria] Agregar categoria de ingreso',
  ADD_SUBCATEGORIA_INGRESO = '[Presupuesto - Subcategoria] Agregar subcategoria de ingreso',
  ADD_SUBCATEGORIA_GASTO = '[Presupuesto - Subcategoria] Agregar subcategoria de ingreso',
  CHANGE_CATEGORIA_ID = '[Presupuesto - Categoria] Cambiar el id de catgeoria por el del registro remoto',
  ADD_MOVIMIENTO = '[Presupuesto - Movimiento] Agregar un movimiento nuevo ',
  CHANGE_MOVEMENT_ID = '[Presupuesto - Movimiento] Cambiar el id del movimiento por el del registro remoto'
}

export const actions = {
  loadPresupuestoList: createAction(presupuestoActionTypes.LOAD_PRESUPUESTOS),
  
  loadPresupuestoListSuccess: createAction(presupuestoActionTypes.LOAD_PRESUPUESTOS_SUCCESS,props<{ Presupuestos: PresupuestoList[] }>()),
  
  loadPresupuestoListFailed: createAction(presupuestoActionTypes.LOAD_PRESUPUESTOS_FAILED,props<{ message: string }>()),
  
  add: createAction(presupuestoActionTypes.ADD, props<{ presupuesto: any }>()),
  
  addSuccess: createAction(presupuestoActionTypes.ADD_SUCCESS,props<{ Presupuesto: PresupuestoList }>()),
  
  addFailed: createAction(presupuestoActionTypes.ADD_FAILED,props<{ message: string }>()),
  
  remove: createAction(presupuestoActionTypes.REMOVE, props<{ id: number }>()),
  
  removeSuccess: createAction(presupuestoActionTypes.REMOVE_SUCCESS,props<{ id: number }>()),
  
  removeFailed: createAction(presupuestoActionTypes.REMOVE_FAILED,props<{ message: string }>()),
  
  update: createAction(presupuestoActionTypes.UPDATE,props<{ Presupuesto: PresupuestoList }>()),
  
  updateSuccess: createAction(presupuestoActionTypes.UPDATE_SUCCESS,props<{ Presupuesto: PresupuestoList }>()),
  
  updateFailed: createAction(presupuestoActionTypes.UPDATE_FAILED,props<{ message: string }>()),

  selectPresupuesto: createAction(presupuestoActionTypes.SELECT_PRESUPUESTO, props<{ presupuestoId: string }>()),
  
  selectPresupuestoSuccess: createAction(presupuestoActionTypes.SELECT_PRESUPUESTO_SUCCESS, props<{ presupuesto: Presupuesto }>()),

  selectPresupuestoFailed: createAction(presupuestoActionTypes.SELECT_PRESUPUESTOS_FAILED, props<{ message: string }>()),

  changePresupuestoSelected: createAction(presupuestoActionTypes.CHANGE_STATE_LOADING, props<{ key: any ,value: any }>()),

  changeStateLoading: createAction(presupuestoActionTypes.CHANGE_STATE_LOADING, props<{ estado: boolean }>()),

  setEstadisticas: createAction(presupuestoActionTypes.SET_ESTADISTICAS, props<{estadisticas: Estadisticas }>()),
  
  setMesFiltrado: createAction(presupuestoActionTypes.SET_FECHA_FILTRADO, props<{fecha: string }>()),

  addSubcategoriaIngreso: createAction(presupuestoActionTypes.ADD_SUBCATEGORIA_INGRESO, props<{subcategoria: any}>()),
  
  addSubcategoriaGasto: createAction(presupuestoActionTypes.ADD_SUBCATEGORIA_GASTO, props<{subcategoria: any}>()),

  addCategoria: createAction(presupuestoActionTypes.ADD_CATEGORIA, props<{categoria: any}>()),

  changeCategoriaId: createAction(presupuestoActionTypes.CHANGE_CATEGORIA_ID, props<{payload}>()),

  addMovimiento: createAction(presupuestoActionTypes.ADD_MOVIMIENTO, props<{movimiento}>()),

  changeMovementId: createAction(presupuestoActionTypes.CHANGE_MOVEMENT_ID, props<{payload}>())
};