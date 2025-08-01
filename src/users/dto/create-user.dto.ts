import {
    IsString,
    IsEnum,
    IsEmail,
    IsDateString,
    Length,
    IsBoolean,
} from 'class-validator'
import { Type } from 'class-transformer'
import { IUser } from '../user/user.interface'
import { typeRole } from '../../common/role.enum'

export class CreateUserDto implements IUser {
    @IsString()
    @Length(3, 20)
    name: string

    @IsString()
    @Length(3, 20)
    surname: string

    @IsDateString()
    dateOfBirth: Date

    @IsString()
    @Length(8, 64)
    password: string

    @IsEmail()
    email: string

    @IsEnum(typeRole)
    role: typeRole

    @IsBoolean()
    activo: boolean
}