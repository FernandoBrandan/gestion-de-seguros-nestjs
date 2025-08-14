import {
    IsString,
    IsEnum,
    IsEmail,
    Length,
    IsInt,
    Min,
} from 'class-validator'
import { Type } from 'class-transformer'
import { IInsurer, typeIdentification } from '../insurer/insurer.interface'

export class CreateInsurerDto implements IInsurer {
    @IsString()
    @Length(3, 100)
    razonSocial: string

    @IsEmail()
    email: string

    @IsEnum(typeIdentification)
    identification_type: typeIdentification

    @IsString()
    @Length(6, 20)
    identification_number: string

    @IsString()
    @Length(5, 30)
    numeroRegistro: string

    @IsString()
    @Length(5, 30)
    licencia: string

    @IsString()
    @Length(2, 5)
    phone_area_code: string

    @IsString()
    @Length(6, 15)
    phone_number: string

    @IsString()
    @Length(3, 100)
    street_name: string

    @Type(() => Number)
    @IsInt()
    @Min(1)
    street_number: number

    @IsString()
    @Length(4, 10)
    zip_code: string

    @IsString()
    @Length(2, 50)
    city: string
}