export interface IClaim {
    _id?: string
    claimNumber: string
    occurrenceDate: Date
    reportDate: Date
    description: string
    claimedAmount: number
    approvedAmount?: number
    status: ClaimStatus
    affectedCoverage: string[]
    observations: string
}

export enum ClaimStatus {
    REPORTED = 'REPORTED',
    UNDER_EVALUATION = 'UNDER_EVALUATION',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
    PAID = 'PAID'
}