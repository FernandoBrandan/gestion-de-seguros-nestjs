export interface IPremium {
    totalAmount: number
    amountPerPeriod: number
    paymentFrequency: PaymentFrequency
    dueDates: string[]
    fractionationSurcharge: number
    taxes: number
    commissions: number
}

export enum PaymentFrequency {
    ANNUAL = 'ANNUAL',
    BIANNUAL = 'BIANNUAL',
    QUARTERLY = 'QUARTERLY',
    MONTHLY = 'MONTHLY'
}

