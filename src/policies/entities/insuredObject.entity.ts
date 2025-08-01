import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
} from 'typeorm'
import { Policy } from './policy.entity'

export enum InsuranceType {
    AUTO = 'AUTO',
    LIFE = 'LIFE',
    HOME = 'HOME',
    HEALTH = 'HEALTH',
    LIABILITY = 'LIABILITY',
    COMMERCIAL = 'COMMERCIAL'
}

@Entity('insured_objects')
export class InsuredObject {
    @PrimaryGeneratedColumn('uuid')
    _id: string

    @Column({
        type: 'enum',
        enum: InsuranceType
    })
    type: InsuranceType

    @Column('text')
    description: string

    @Column('decimal', { precision: 15, scale: 2, name: 'insured_value' })
    insuredValue: number

    @Column('jsonb')
    details: Record<string, any>

    @OneToOne(() => Policy, (policy) => policy.insuredObject, {
        onDelete: 'CASCADE'
    })
    policy: Policy
}
