import { typeRole } from '@/common/role.enum'

export interface IUser {
    _id?: string
    name: string
    surname: string
    dateOfBirth: Date
    password: string
    email: string
    role: typeRole
    // permisos: string[];
    activo: boolean
    createdAt?: Date
    updatedAt?: Date
}

export interface IUserAuth {
    email: string
    password: string
    tokens: {
        accessToken: string
        refreshToken: string
    }
}

export interface IUserFilter {
    filter?: string
    sort?: string
    limit?: number
    offset?: number
}
