import {
    IsString,
    IsNumber,
    IsEnum,
    Length,
    Min,
    IsObject,
    IsNotEmpty,
    IsPositive
} from 'class-validator'
import { Type, Transform } from 'class-transformer'
import { IInsuredObject, InsuranceType } from '../domain/interfaces/insuredObject.interface'

export class CreateInsuredObjectDto implements Omit<IInsuredObject, '_id'> {
    @IsEnum(InsuranceType)
    type: InsuranceType

    @IsString()
    @IsNotEmpty()
    @Length(10, 500)
    description: string

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsPositive()
    @Min(0.01)
    insuredValue: number

    @IsObject()
    details: Record<string, any>
}