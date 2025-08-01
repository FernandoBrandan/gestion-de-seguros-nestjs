export interface ICustomer {
    _id?: string
    name: string
    surname: string
    dateOfBirth: Date
    email: string

    identification_type: typeIdentification
    identification_number: string

    phone_area_code: string
    phone_number: string

    street_name: string
    street_number: number
    zip_code: string
    city: string
    // Adicional direccion
    // piso?: string
    // departamento?: string
    // provincia: string
    // pais: string

    createdAt?: Date
    updatedAt?: Date
}

export enum typeIdentification {
    DNI = "DNI",
    CUIT = "CUIT",      // Para empresas
    CUIL = "CUIL",      // Para personas
    PASSPORT = "PASSPORT",
    CE = "CE"           // Cédula de extranjería
}