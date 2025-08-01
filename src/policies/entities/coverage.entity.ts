import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    Index,
} from 'typeorm'
import { Policy } from './policy.entity'

@Entity('coverages')
@Index(['policy', 'name'])
export class Coverage {
    @PrimaryGeneratedColumn('uuid')
    _id: string

    @Column()
    name: string

    @Column('text')
    description: string

    @Column('decimal', { precision: 15, scale: 2, name: 'insured_sum' })
    insuredSum: number

    @Column('decimal', { precision: 15, scale: 2 })
    deductible: number

    @Column('decimal', { precision: 15, scale: 2, name: 'event_limit' })
    eventLimit: number

    @Column({ default: true })
    active: boolean

    @Column({ name: 'policy_id' })
    policyId: string

    @ManyToOne(() => Policy, (policy) => policy.coverages, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'policy_id' })
    policy: Policy
}
