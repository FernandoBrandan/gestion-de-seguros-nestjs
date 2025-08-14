export interface IPayment {
    _id?: string
    date: Date
    amount: number
    paymentMethod: payment_method
    receiptNumber: string
    status: 'PENDING' | 'PAID' | 'OVERDUE'
}

export enum payment_method {
    CREDIT_CARD = 'CREDIT_CARD',
    DEBIT_CARD = 'DEBIT_CARD',
    BANK_TRANSFER = 'BANK_TRANSFER',
    CASH = 'CASH',
    CHECK = 'CHECK',
}
