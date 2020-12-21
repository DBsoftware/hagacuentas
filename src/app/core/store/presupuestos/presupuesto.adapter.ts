import { EntityState } from '@ngrx/entity';
import { PresupuestoList, Presupuesto, Estadisticas } from './presupuesto.interface';
import { createEntityAdapter } from '@ngrx/entity';

export interface PresupuestoState extends EntityState<PresupuestoList> {
    selectedPresupuesto: Presupuesto;
    loading: boolean;
    estadisticas: Estadisticas;
    fecha: string;
}

export const presupuestoAdapter = createEntityAdapter<PresupuestoList>();