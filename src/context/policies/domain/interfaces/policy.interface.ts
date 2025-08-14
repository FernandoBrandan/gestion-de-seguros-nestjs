import { IInsuredObject } from './insuredObject.interface'
import { ICoverage } from './coverage.interface'
import { IExclusion } from './exclusion.interface'
import { IPremium } from './premium.interface'
import { IClaim } from './claim.interface'
import { IPayment } from './payment.interface'

import { PolicyStatus } from '../../../../common/policyStatus.enum'

export interface IPolicy {
    // Identification
    _id?: string
    policyNumber: string
    applicationNumber: string
    issueDate: Date

    // Involved parties
    insurerId: string // IInsurer
    policyholderId: string // ICustomer
    insuredId: string // ICustomer
    beneficiaryIds: string[] // ICustomer[]

    // Insured object
    insuredObject: IInsuredObject

    // Temporal information
    effectiveDate: Date
    expirationDate: Date
    contractDuration: number
    automaticRenewal: boolean

    // Coverages and risks
    coverages: ICoverage[]
    exclusions: IExclusion[]
    particularConditions: string
    additionalClauses: string[]

    // Economic aspects
    premium: IPremium
    paymentHistory: IPayment[]

    // Status and management
    status: PolicyStatus
    salesChannel: string
    agentBroker?: string

    // Claims
    claims: IClaim[]

    // Complementary information
    emergencyContact: string
    claimsProcedure: string
    gracePeriod: number // days

    // Metadata
    createdAt: Date
    updatedAt: Date
    version: number
    notes: string
    active: boolean
}

// Migrado a common
// export enum PolicyStatus {
//     ACTIVE = 'ACTIVE',
//     EXPIRED = 'EXPIRED',
//     CANCELLED = 'CANCELLED',
//     SUSPENDED = 'SUSPENDED',
//     IN_PROCESS = 'IN_PROCESS'
// }