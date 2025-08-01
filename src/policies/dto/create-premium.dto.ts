import {
    IsNumber,
    IsEnum,
    IsArray,
    IsOptional,
    Min,
    ArrayMinSize,
    IsPositive
} from 'class-validator'
import { Type, Transform } from 'class-transformer'
import { IPremium, PaymentFrequency } from '../interfaces/premium.interface'

export class CreatePremiumDto implements IPremium {
    @IsNumber({ maxDecimalPlaces: 2 })
    @IsPositive()
    @Min(0.01)
    totalAmount: number

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsPositive()
    @Min(0.01)
    amountPerPeriod: number

    @IsEnum(PaymentFrequency)
    paymentFrequency: PaymentFrequency

    @IsArray()
    @IsOptional()
    @Transform(({ value }) => {
        // Si viene como array de Date, convertir a strings
        if (Array.isArray(value)) {
            return value.map(item =>
                item instanceof Date ? item.toISOString().split('T')[0] : item
            )
        }
        return value
    })
    dueDates: string[]

    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(0)
    @IsOptional()
    fractionationSurcharge: number = 0

    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(0)
    @IsOptional()
    taxes: number = 0

    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(0)
    @IsOptional()
    commissions: number = 0
}
