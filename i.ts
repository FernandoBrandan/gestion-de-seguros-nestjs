export interface IInsuredObject {
    id: string
    type: InsuranceType
    descripcion: string
    valorAsegurado: number
    detalles: Record<string, any> // Para propiedades específicas por tipo
}

export interface IVehiculoAsegurado extends IInsuredObject {
    detalles: {
        marca: string
        modelo: string
        año: number
        patente: string
        numeroBastidor: string
        motor: string
        combustible: string
        uso: string
    }
}

export interface IPropiedadAsegurada extends IInsuredObject {
    detalles: {
        tipoPropiedad: string
        añoConstruccion: number
        metrosCuadrados: number
        material: string
        sistemaSeguridad: boolean
    }
}

export enum InsuranceType {
    AUTO = 'AUTO',
    VIDA = 'VIDA',
    HOGAR = 'HOGAR',
    SALUD = 'SALUD',
    RESPONSABILIDAD_CIVIL = 'RESPONSABILIDAD_CIVIL',
    COMERCIAL = 'COMERCIAL'
}

//****************************************************************

// Interfaces para coberturas
export interface ICobertura {
    id: string
    nombre: string
    descripcion: string
    sumaAsegurada: number
    deducible: number
    limiteEvento: number
    activa: boolean
}

export interface IExclusion {
    id: string
    nombre: string
    descripcion: string
    tipo: 'GENERAL' | 'ESPECIFICA'
}

//****************************************************************

export interface IPrima {
    montoTotal: number
    montoPorPeriodo: number
    formaPago: FormaPago
    fechasVencimiento: Date[]
    recargoFraccionamiento: number
    impuestos: number
    comisiones: number
}

export enum FormaPago {
    ANUAL = 'ANUAL',
    SEMESTRAL = 'SEMESTRAL',
    TRIMESTRAL = 'TRIMESTRAL',
    MENSUAL = 'MENSUAL'
}

export interface IPago {
    id: string
    fecha: Date
    monto: number
    metodoPago: string
    numeroRecibo: string
    estado: 'PENDIENTE' | 'PAGADO' | 'VENCIDO'
}

//****************************************************************

export interface ISiniestro {
    id: string
    numeroSiniestro: string
    fechaOcurrencia: Date
    fechaReporte: Date
    descripcion: string
    montoReclamado: number
    montoAprobado?: number
    estado: EstadoSiniestro
    coberturaAfectada: string[]
    observaciones: string
}

export enum EstadoSiniestro {
    REPORTADO = 'REPORTADO',
    EN_EVALUACION = 'EN_EVALUACION',
    APROBADO = 'APROBADO',
    RECHAZADO = 'RECHAZADO',
    PAGADO = 'PAGADO'
}