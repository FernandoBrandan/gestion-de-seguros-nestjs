import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
} from 'typeorm'
import { Policy } from '../policies/domain/entities/policy.entity'

export enum PaymentFrequency {
    ANNUAL = 'ANNUAL',
    BIANNUAL = 'BIANNUAL',
    QUARTERLY = 'QUARTERLY',
    MONTHLY = 'MONTHLY'
}

@Entity('premiums')
export class Premium {
    @PrimaryGeneratedColumn('uuid')
    _id: string

    @Column('decimal', { precision: 15, scale: 2, name: 'total_amount' })
    totalAmount: number

    @Column('decimal', { precision: 15, scale: 2, name: 'amount_per_period' })
    amountPerPeriod: number

    @Column({
        type: 'enum',
        enum: PaymentFrequency,
        name: 'payment_method'
    })
    paymentFrequency: PaymentFrequency

    @Column('simple-array', { name: 'due_dates' })
    dueDates: string[] // Store as ISO strings for simple-array

    @Column('decimal', {
        precision: 15,
        scale: 2,
        default: 0,
        name: 'fractionation_surcharge'
    })
    fractionationSurcharge: number

    @Column('decimal', { precision: 15, scale: 2, default: 0 })
    taxes: number

    @Column('decimal', { precision: 15, scale: 2, default: 0 })
    commissions: number

    @OneToOne(() => Policy, (policy) => policy.premium, {
        onDelete: 'CASCADE'
    })
    policy: Policy
}
