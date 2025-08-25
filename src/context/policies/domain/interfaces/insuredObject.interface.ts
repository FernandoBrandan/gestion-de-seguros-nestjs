export interface IInsuredObject {
    _id?: string
    type: InsuranceType
    description: string
    insuredValue: number
    details: Record<string, any> // For type-specific properties
}

export interface IInsuredVehicle extends IInsuredObject {
    details: {
        brand: string
        model: string
        year: number
        licensePlate: string
        chassisNumber: string
        engine: string
        fuel: string
        usage: string
    }
}

export interface IInsuredProperty extends IInsuredObject {
    details: {
        propertyType: string
        constructionYear: number
        squareMeters: number
        material: string
        securitySystem: boolean
    }
}

export enum InsuranceType {
    AUTO = 'AUTO',
    LIFE = 'LIFE',
    HOME = 'HOME',
    HEALTH = 'HEALTH',
    LIABILITY = 'LIABILITY',
    COMMERCIAL = 'COMMERCIAL'
}

// plantillas de coberturas
// https://123seguro.com.ar/aseguradoras
// Tipo A B C 

// Tipo A
// Cubre minimas cosas
// Tipo B
// Cubre mas cosas
// Tipo C
// Cubre todo
