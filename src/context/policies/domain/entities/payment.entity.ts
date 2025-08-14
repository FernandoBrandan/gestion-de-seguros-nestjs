import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    Index,
} from 'typeorm'
import { Policy } from './policy.entity'

@Entity('payments')
@Index(['policy', 'date'])
@Index(['status'])
export class Payment {
    @PrimaryGeneratedColumn('uuid')
    _id: string

    @Column('date')
    date: Date

    @Column('decimal', { precision: 15, scale: 2 })
    amount: number

    @Column({ name: 'payment_method' })
    paymentMethod: string

    @Column({ name: 'receipt_number' })
    receiptNumber: string

    @Column({
        type: 'enum',
        enum: ['PENDING', 'PAID', 'OVERDUE'],
        default: 'PENDING'
    })
    status: 'PENDING' | 'PAID' | 'OVERDUE'

    @Column({ name: 'policy_id' })
    policyId: string

    @ManyToOne(() => Policy, (policy) => policy.paymentHistory, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'policy_id' })
    policy: Policy
}
