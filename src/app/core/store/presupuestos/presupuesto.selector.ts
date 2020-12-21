import { PresupuestoState, presupuestoAdapter } from './presupuesto.adapter';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import {getSelectedPresupuesto, getLoadingState, getList, getSelectedPresupuestoCategorias, getSelectedPresupuestoCategoriasGastos, getSelectedPresupuestoCategoriasIngresos, getSelectedPresupuestosubCategoriasIngresos, getEstadisticas, getFecha, getState} from './presupuesto.reducer';

export const selectPresupuestoState = createFeatureSelector<PresupuestoState>('presupuestos');


export const selectAllState = createSelector(selectPresupuestoState, getState);
export const selectFecha = createSelector(selectPresupuestoState, getFecha);
export const selectList = createSelector(selectPresupuestoState, getList);
export const selectSelected = createSelector(selectPresupuestoState, getSelectedPresupuesto);
export const selectCategorias = createSelector(selectPresupuestoState, getSelectedPresupuestoCategorias);
export const selectCategoriasIngresos = createSelector(selectPresupuestoState, getSelectedPresupuestoCategoriasIngresos);
export const selectsubCategoriasIngresos = createSelector(selectPresupuestoState, getSelectedPresupuestosubCategoriasIngresos);
export const selectCategoriasGastos = createSelector(selectPresupuestoState, getSelectedPresupuestoCategoriasGastos);
export const selectLoading = createSelector(selectPresupuestoState, getLoadingState);
export const selectEstadisticas = createSelector(selectPresupuestoState, getEstadisticas);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = presupuestoAdapter.getSelectors(selectPresupuestoState);