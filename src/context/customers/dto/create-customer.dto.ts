import {
    IsString,
    IsEnum,
    IsEmail,
    IsDateString,
    Length,
    IsNumberString,
    IsInt,
    Min,
} from 'class-validator'
import { Type } from 'class-transformer'
import { typeIdentification } from '@/common/types/identificationType'
import { ICustomer } from '@/common/interfaces/customer.interface'

export class CreateCustomerDto implements ICustomer {
    @IsString()
    @Length(2, 50)
    name: string

    @IsString()
    @Length(2, 50)
    surname: string

    @IsDateString()
    dateOfBirth: Date

    @IsEmail()
    email: string

    @IsEnum(typeIdentification)
    identification_type: typeIdentification

    @IsString()
    @Length(6, 20)
    identification_number: string

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
