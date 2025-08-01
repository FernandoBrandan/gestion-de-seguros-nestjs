import {
    IsString,
    IsDate,
    IsNumber,
    IsBoolean,
    IsEnum,
    IsArray,
    IsOptional,
    Length,
    Min,
    Max,
    IsUUID,
    ValidateNested,
    ArrayMinSize,
    IsNotEmpty,
} from 'class-validator'
import { Type, Transform } from 'class-transformer'

import { CreateInsuredObjectDto } from './create-insuredObject.dto'
import { CreateCoverageDto } from './create-coverage.dto'
import { CreateExclusionDto } from './create-exclusion.dto'
import { CreatePremiumDto } from './create-premium.dto'
import { CreatePaymentDto } from './create-payment.dto'
import { CreateClaimDto } from './create-claim.dto'

import { PolicyStatus } from '../../common/policyStatus.enum'

export class CreatePolicyDto {
    // Identification
    @IsString()
    @IsNotEmpty()
    @Length(3, 20)
    policyNumber: string

    @IsString()
    @IsNotEmpty()
    @Length(3, 30)
    applicationNumber: string

    @IsDate()
    @IsNotEmpty()
    @Type(() => Date)
    issueDate: Date

    /********************************** */

    // Involved parties
    @IsUUID()
    insurerId: string

    @IsUUID()
    policyholderId: string

    @IsUUID()
    insuredId: string

    @IsArray()
    @IsUUID('4', { each: true })
    @IsOptional()
    beneficiaryIds: string[] = []

    /********************************** */

    // Insured object
    @ValidateNested()
    @Type(() => CreateInsuredObjectDto)
    insuredObject: CreateInsuredObjectDto

    /********************************** */

    // Temporal information
    @IsDate()
    @Type(() => Date)
    effectiveDate: Date

    @IsDate()
    @Type(() => Date)
    expirationDate: Date

    @IsNumber()
    @Min(1)
    @Max(50)
    contractDuration: number

    @IsBoolean()
    @IsOptional()
    automaticRenewal: boolean = false

    /********************************** */

    // Coverages and risks
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateCoverageDto)
    @ArrayMinSize(1)
    coverages: CreateCoverageDto[]

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateExclusionDto)
    @IsOptional()
    exclusions: CreateExclusionDto[] = []

    @IsString()
    @IsNotEmpty()
    @Length(10, 2000)
    particularConditions: string

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    additionalClauses: string[] = []

    /********************************** */

    // Economic aspects
    @ValidateNested()
    @Type(() => CreatePremiumDto)
    premium: CreatePremiumDto

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreatePaymentDto)
    @IsOptional()
    paymentHistory: CreatePaymentDto[] = []

    /********************************** */

    // Status and management
    @IsEnum(PolicyStatus)
    @IsOptional()
    status: PolicyStatus = PolicyStatus.IN_PROCESS

    @IsString()
    @IsNotEmpty()
    @Length(2, 50)
    salesChannel: string

    @IsString()
    @IsOptional()
    @Length(2, 100)
    agentBroker?: string

    /********************************** */

    // Claims
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateClaimDto)
    @IsOptional()
    claims: CreateClaimDto[] = []

    /********************************** */

    // Complementary information
    @IsString()
    @IsNotEmpty()
    @Length(10, 200)
    emergencyContact: string

    @IsString()
    @IsNotEmpty()
    @Length(20, 1000)
    claimsProcedure: string

    @IsNumber()
    @Min(0)
    @Max(365)
    gracePeriod: number

    /********************************** */

    // Metadata
    @IsNumber()
    @Min(1)
    @IsOptional()
    version: number = 1

    @IsString()
    @IsOptional()
    @Length(0, 1000)
    notes: string = ''

    @IsBoolean()
    @IsOptional()
    active: boolean = true
}