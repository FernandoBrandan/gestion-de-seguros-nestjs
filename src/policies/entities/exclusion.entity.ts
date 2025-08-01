import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    Index,
} from 'typeorm'
import { Policy } from './policy.entity'

@Entity('exclusions')
@Index(['policy', 'name'])
export class Exclusion {
    @PrimaryGeneratedColumn('uuid')
    _id: string

    @Column()
    name: string

    @Column('text')
    description: string

    @Column({
        type: 'enum',
        enum: ['GENERAL', 'SPECIFIC']
    })
    type: 'GENERAL' | 'SPECIFIC'

    @Column({ name: 'policy_id' })
    policyId: string

    @ManyToOne(() => Policy, (policy) => policy.exclusions, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'policy_id' })
    policy: Policy
}
