import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PresupuestoList } from './presupuesto.interface';
// import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PresupuestoService {
  constructor(private http: HttpClient) {}

  public getAll(): Observable<PresupuestoList[]> {
    return this.http.get<PresupuestoList[]>('environment.backendUrl');
  }

  public delete(id: number): Observable<PresupuestoList> {
    return this.http.delete<PresupuestoList>(`${'environment.backendUrl'}/${id}`);
  }

  public add(Presupuesto: PresupuestoList): Observable<PresupuestoList> {
    return this.http.post<PresupuestoList>('environment.backendUrl', Presupuesto);
  }

  public update(Presupuesto: Partial<PresupuestoList>): Observable<PresupuestoList> {
    return this.http.put<PresupuestoList>(`${'environment.backendUrl'}`, Presupuesto);
  }
}