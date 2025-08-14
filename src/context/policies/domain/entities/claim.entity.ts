import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    Index,
} from 'typeorm'
import { Policy } from './policy.entity'

export enum ClaimStatus {
    REPORTED = 'REPORTED',
    UNDER_EVALUATION = 'UNDER_EVALUATION',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
    PAID = 'PAID'
}

@Entity('claims')
@Index(['policy', 'claimNumber'])
@Index(['status'])
@Index(['occurrenceDate'])
export class Claim {
    @PrimaryGeneratedColumn('uuid')
    _id: string

    @Column({ unique: true, name: 'claim_number' })
    claimNumber: string

    @Column('date', { name: 'occurrence_date' })
    occurrenceDate: Date

    @Column('date', { name: 'report_date' })
    reportDate: Date

    @Column('text')
    description: string

    @Column('decimal', { precision: 15, scale: 2, name: 'claimed_amount' })
    claimedAmount: number

    @Column('decimal', {
        precision: 15,
        scale: 2,
        nullable: true,
        name: 'approved_amount'
    })
    approvedAmount?: number

    @Column({
        type: 'enum',
        enum: ClaimStatus,
        default: ClaimStatus.REPORTED
    })
    status: ClaimStatus

    @Column('simple-array', { name: 'affected_coverage' })
    affectedCoverage: string[]

    @Column('text')
    observations: string

    @Column({ name: 'policy_id' })
    policyId: string

    @ManyToOne(() => Policy, (policy) => policy.claims, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'policy_id' })
    policy: Policy
}