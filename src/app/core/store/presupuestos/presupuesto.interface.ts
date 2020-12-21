interface Tipo{
    type: string,
    data: number[]
}

export interface Presupuesto {
    id: number,
    nombre: string,
    tipo: Tipo,
    fecha: string,
    estado: number,
    id_app: number,
    categorias: [],
    movimientosPredeterminados: [],
    alertas: []
  }
export interface PresupuestoList {
    id: number,
    nombre: string,
  }

export interface Estadisticas {
  balance: number,
  totalGastos: number,
  totalIngresos: number
}