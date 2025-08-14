import {
    IsString,
    IsDate,
    IsNumber,
    IsEnum,
    IsArray,
    IsOptional,
    Length,
    Min,
    ArrayMinSize,
    IsNotEmpty,
    IsPositive
} from 'class-validator'
import { Type, Transform } from 'class-transformer'
import { IClaim, ClaimStatus } from '../domain/interfaces/claim.interface'

export class CreateClaimDto implements Omit<IClaim, '_id'> {
    @IsString()
    @IsNotEmpty()
    @Length(5, 50)
    claimNumber: string

    @IsDate()
    @Type(() => Date)
    occurrenceDate: Date

    @IsDate()
    @Type(() => Date)
    reportDate: Date

    @IsString()
    @IsNotEmpty()
    @Length(20, 1000)
    description: string

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsPositive()
    @Min(0.01)
    claimedAmount: number

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsOptional()
    @Min(0)
    approvedAmount?: number

    @IsEnum(ClaimStatus)
    @IsOptional()
    status: ClaimStatus = ClaimStatus.REPORTED

    @IsArray()
    @IsString({ each: true })
    @ArrayMinSize(1)
    affectedCoverage: string[]

    @IsString()
    @IsOptional()
    @Length(0, 1000)
    observations: string = ''
}
