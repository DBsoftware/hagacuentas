import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap, filter } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { PresupuestoList, Presupuesto, Estadisticas } from './presupuesto.interface';
import { actions as PresupuestoActions } from './presupuesto.actions';
import { PresupuestoService } from './presupuesto.service';
import { of } from 'rxjs';
import { LocalStorageService } from '../../_services/local_Storage.service';
import { ApiPresupuestosService } from '../../_services/api_presupuesto.service';
import { AuxiliarsService } from '../../_services/auxiliars.service';
import { AppStore } from '../store.interface';
import { Store } from '@ngrx/store';
import { selectFecha, selectPresupuestoState, selectAllState } from './presupuesto.selector';

@Injectable()
export class PresupuestoEffects {
  constructor(
    private actions$: Actions,
    private PresupuestoService: PresupuestoService,
    private _localStorageService: LocalStorageService,
    private _auxiliars: AuxiliarsService,
    private _apiPresupuestosService:ApiPresupuestosService,
    private store$: Store<AppStore>,
  ) {}

  Presupuesto_ACTIONS_SUCCESS = [
    PresupuestoActions.addSuccess,
    PresupuestoActions.updateSuccess,
    PresupuestoActions.removeSuccess,
    PresupuestoActions.loadPresupuestoListSuccess
  ];

  Presupuesto_ACTIONS_FAILED = [
    PresupuestoActions.addFailed,
    PresupuestoActions.updateFailed,
    PresupuestoActions.removeFailed,
    PresupuestoActions.loadPresupuestoListFailed,
    PresupuestoActions.selectPresupuestoFailed
  ];

  activateLoading$ = createEffect(() =>
  this.actions$.pipe(
      ofType(PresupuestoActions.loadPresupuestoList),
      switchMap((action: any) =>
        of({estado: true}).pipe(
          map(cambio  => PresupuestoActions.changeStateLoading(cambio)),
          catchError(message => {
            
            return of(PresupuestoActions.addFailed({ message }))})
        )
      )
    )
  );
  deActivateLoading$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PresupuestoActions.loadPresupuestoListSuccess),
      switchMap((action: any) =>
        of({estado: false}).pipe(
          map(cambio  => PresupuestoActions.changeStateLoading(cambio)),
          catchError(message => of(PresupuestoActions.addFailed({ message })))
        )
      )
    )
  )
  deActivateLoadingOnFail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PresupuestoActions.loadPresupuestoListFailed),
      switchMap((action: any) =>
        of({estado: false}).pipe(
          map(cambio  => PresupuestoActions.changeStateLoading(cambio)),
          catchError(message => of(PresupuestoActions.addFailed({ message })))
        )
      )
    )
  )
  loadAllPresupuesto$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PresupuestoActions.loadPresupuestoList),
      switchMap(() => this._localStorageService.getStorageSize()),
      switchMap(size => (size > 0) ? 
        this._localStorageService.getAll('p_') : 
        this._apiPresupuestosService.getAllPresupuestos() 
            )).pipe(
          map((presupuestos: any) => presupuestos.map(({id, nombre}: any) => ({id, nombre}))),
          map(Presupuestos => PresupuestoActions.loadPresupuestoListSuccess({ Presupuestos })),
          catchError(message =>
            of(PresupuestoActions.loadPresupuestoListFailed({ message }))
          ))
        );

  selectPresupuesto$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PresupuestoActions.selectPresupuesto),
      tap(data => localStorage.setItem('presupuestoSelected', data.presupuestoId)),
      switchMap((action: any) =>
      this._localStorageService.getData(`p_${action.presupuestoId}`).pipe(
        switchMap(e => e == undefined || !e ? this._localStorageService.getData(`un_p_${action.presupuestoId}`) : of(e)),
        map((data: any) => this._auxiliars.ajustarMovimientosPredeterminados(data)),
          map((presupuesto: Presupuesto) => PresupuestoActions.selectPresupuestoSuccess({ presupuesto })),
          catchError(message => of(PresupuestoActions.selectPresupuestoFailed({ message })))
        )
      )
    )
  );
  setEstadisticas$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PresupuestoActions.selectPresupuestoSuccess),
      switchMap((action) => this.store$.select(selectFecha).pipe(map((mes) => ({mes, action})))),
      switchMap(({mes, action}: any) =>
        this._auxiliars.procesarDatos(action['presupuesto'], mes ).pipe(
          map((estadisticas: Estadisticas) => PresupuestoActions.setEstadisticas({ estadisticas })),
          catchError(message => of(PresupuestoActions.addFailed({ message })))
        )
      )
    )
  );
  addPresupuesto$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PresupuestoActions.add),
        switchMap((action: any) => 
        this._apiPresupuestosService.addPresupuesto(action.presupuesto).pipe(
          map(({nombre, id}: any) => PresupuestoActions.addSuccess({ Presupuesto: {nombre, id} })),
          catchError(message => {
            return of(PresupuestoActions.addFailed({ message }))
          })
        )
      )
    ));

  deletePresupuesto$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PresupuestoActions.remove),
      switchMap(({ id }) =>
        this.PresupuestoService.delete(id).pipe(
          map(() => PresupuestoActions.removeSuccess({ id })),
          catchError(message => of(PresupuestoActions.removeFailed({ message })))
        )
      )
    )
  );

  updatePresupuesto$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PresupuestoActions.update),
      switchMap(({ Presupuesto }) =>
        this.PresupuestoService.update(Presupuesto).pipe(
          map(() => PresupuestoActions.updateSuccess({ Presupuesto })),
          catchError(message => of(PresupuestoActions.updateFailed(message)))
        )
      )
    )
  );

  successNotification$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(...this.Presupuesto_ACTIONS_SUCCESS),
        tap(() =>
            console.log('SUCCESS', 'Operation success')
        )
      ),
    { dispatch: false }
  );

  failedNotification$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(...this.Presupuesto_ACTIONS_FAILED),
        tap((message) =>
          console.log('FAILED', message)
        )
      ),
    { dispatch: false }
  );
}