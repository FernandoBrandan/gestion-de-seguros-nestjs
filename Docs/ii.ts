// // policy.interface.ts
// import {
//     IInsuredObject,
//     ICobertura,
//     IExclusion,
//     IPrima,
//     ISiniestro,
//     IPago
// } from ''

// export interface IPolicy {
//     // Identificación
//     _id?: string
//     numeroPoliza: string
//     numeroSolicitud: string
//     fechaEmision: Date

//     // Partes involucradas
//     insurerId: string // IInsurer
//     policyholderId: string // ICustomer
//     insuredId: string // ICustomer
//     beneficiaryIds: string[] // ICustomer[]

//     // Objeto asegurado
//     insuredObject: IInsuredObject

//     // Información temporal
//     fechaInicioVigencia: Date
//     fechaVencimiento: Date
//     duracionContrato: number
//     renovacionAutomatica: boolean

//     // Coberturas y riesgos
//     coberturas: ICobertura[]
//     exclusiones: IExclusion[]
//     condicionesParticulares: string
//     clausulasAdicionales: string[]

//     // Aspectos económicos
//     prima: IPrima
//     historialPagos: IPago[]

//     // Estado y gestión
//     estado: EstadoPoliza
//     canalVenta: string
//     agenteCorreder?: string

//     // Siniestros
//     siniestros: ISiniestro[]

//     // Información complementaria
//     contactoEmergencia: string
//     procedimientoSiniestros: string
//     periodoGracia: number // días

//     // Metadatos
//     fechaCreacion: Date
//     fechaActualizacion: Date
//     version: number
//     notas: string
//     activa: boolean
// }

// export enum EstadoPoliza {
//     ACTIVA = 'ACTIVA',
//     VENCIDA = 'VENCIDA',
//     CANCELADA = 'CANCELADA',
//     SUSPENDIDA = 'SUSPENDIDA',
//     EN_PROCESO = 'EN_PROCESO'
// }