import {
    IsString,
    IsDate,
    IsNumber,
    IsEnum,
    IsOptional,
    Length,
    Min,
    IsNotEmpty,
    IsPositive
} from 'class-validator'
import { Type, Transform } from 'class-transformer'
import { IPayment, payment_method } from '../domain/interfaces/payment.interface'

export class CreatePaymentDto implements Omit<IPayment, '_id'> {
    @IsDate()
    @Type(() => Date)
    date: Date

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsPositive()
    @Min(0.01)
    amount: number

    @IsEnum(payment_method)
    paymentMethod: payment_method

    @IsString()
    @IsNotEmpty()
    @Length(5, 50)
    receiptNumber: string

    @IsEnum(['PENDING', 'PAID', 'OVERDUE'])
    @IsOptional()
    status: 'PENDING' | 'PAID' | 'OVERDUE' = 'PENDING'
}