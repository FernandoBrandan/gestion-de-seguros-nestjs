import {
    IsString,
    IsNumber,
    IsBoolean,
    IsOptional,
    Length,
    Min,
    IsNotEmpty,
    IsPositive
} from 'class-validator'
import { Type, Transform } from 'class-transformer'
import { ICoverage } from '../domain/interfaces/coverage.interface'

export class CreateCoverageDto implements Omit<ICoverage, '_id'> {
    @IsString()
    @IsNotEmpty()
    @Length(2, 100)
    name: string

    @IsString()
    @IsNotEmpty()
    @Length(10, 500)
    description: string

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsPositive()
    @Min(0.01)
    insuredSum: number

    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(0)
    deductible: number

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsPositive()
    @Min(0.01)
    eventLimit: number

    @IsBoolean()
    @IsOptional()
    active: boolean = true
}