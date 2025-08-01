import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'

import { Customer } from '../../customers/entities/customer.entity'
import { Insurer } from '../../insurers/entities/insurer.entity'

import { Coverage } from './coverage.entity'
import { Exclusion } from './exclusion.entity'
import { Payment } from './payment.entity'
import { Premium } from './premium.entity'
import { Claim } from './claim.entity'
import { InsuredObject } from './insuredObject.entity'

export enum PolicyStatus {
    ACTIVE = 'ACTIVE',
    EXPIRED = 'EXPIRED',
    CANCELLED = 'CANCELLED',
    SUSPENDED = 'SUSPENDED',
    IN_PROCESS = 'IN_PROCESS'
}

@Entity('policies')
export class Policy {
    // Identification
    @PrimaryGeneratedColumn('uuid')
    _id: string

    @Column({ unique: true, name: 'policy_number' })
    policyNumber: string

    @Column({ name: 'application_number' })
    applicationNumber: string

    @Column({ type: 'date', name: 'issue_date' })
    issueDate: Date

    /********************************** */

    // Involved parties
    @Column({ name: 'insurer_id' })
    insurerId: string

    @ManyToOne(() => Insurer, { eager: false })
    @JoinColumn({ name: 'insurer_id' })
    insurer: Insurer

    @Column({ name: 'policyholder_id' })
    policyholderId: string

    @ManyToOne(() => Customer, { eager: false })
    @JoinColumn({ name: 'policyholder_id' })
    policyholder: Customer

    @Column({ name: 'insured_id' })
    insuredId: string

    @ManyToOne(() => Customer, { eager: false })
    @JoinColumn({ name: 'insured_id' })
    insured: Customer

    @ManyToMany(() => Customer, { eager: false })
    @JoinTable({
        name: 'policy_beneficiaries',
        joinColumn: { name: 'policy_id', referencedColumnName: '_id' },
        inverseJoinColumn: { name: 'beneficiary_id', referencedColumnName: '_id' },
    })
    beneficiaries: Customer[]

    /********************************** */

    // Insured object 
    @OneToOne(() => InsuredObject, (io) => io.policy, {
        cascade: true,
        eager: false,
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'insured_object_id' })
    insuredObject: InsuredObject

    /********************************** */

    // Temporal information
    @Column({ type: 'date', name: 'effective_date' })
    effectiveDate: Date

    @Column({ type: 'date', name: 'expiration_date' })
    expirationDate: Date

    @Column({ name: 'contract_duration' })
    contractDuration: number

    @Column({ default: false, name: 'automatic_renewal' })
    automaticRenewal: boolean

    /********************************** */

    // Coverages and risks
    @OneToMany(() => Coverage, (c) => c.policy, {
        cascade: true,
        eager: false
    })
    coverages: Coverage[]

    @OneToMany(() => Exclusion, (e) => e.policy, {
        cascade: true,
        eager: false
    })
    exclusions: Exclusion[]

    @Column({ type: 'text', name: 'particular_conditions' })
    particularConditions: string

    @Column('simple-array', { name: 'additional_clauses' })
    additionalClauses: string[]

    /********************************** */

    // Economic aspects
    @OneToOne(() => Premium, (p) => p.policy, {
        cascade: true,
        eager: false,
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'premium_id' })
    premium: Premium

    @OneToMany(() => Payment, (p) => p.policy, {
        cascade: true,
        eager: false
    })
    paymentHistory: Payment[]

    /********************************** */

    // Status and management
    @Column({
        type: 'enum',
        enum: PolicyStatus,
        default: PolicyStatus.IN_PROCESS
    })
    status: PolicyStatus

    @Column({ name: 'sales_channel' })
    salesChannel: string

    @Column({ nullable: true, name: 'agent_broker' })
    agentBroker?: string

    /********************************** */

    // Claims
    @OneToMany(() => Claim, (s) => s.policy, {
        cascade: true,
        eager: false
    })
    claims: Claim[]

    /********************************** */

    // Complementary information
    @Column({ name: 'emergency_contact' })
    emergencyContact: string

    @Column({ type: 'text', name: 'claims_procedure' })
    claimsProcedure: string

    @Column({ name: 'grace_period' })
    gracePeriod: number

    /********************************** */

    // Metadata

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt?: Date

    /** */

    @Column({ default: 1 })
    version: number

    @Column({ nullable: true, type: 'text' })
    notes: string

    @Column({ default: true })
    active: boolean
}