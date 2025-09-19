import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm'
import { InsuranceType } from '@/common/types/insuranceType'

@Entity('insured_objects')
export class InsuredObject {
    @PrimaryGeneratedColumn('uuid')
    _id: string

    @Column({ type: 'enum', enum: InsuranceType })
    type: InsuranceType

    @Column('decimal', { precision: 15, scale: 2, name: 'insured_value' })
    insuredValue: number

    @Column('text')
    description: string

    @Column("jsonb", { nullable: true })
    details?: Record<string, any> // Info flexible para tipos menos usados

    @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date

    @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date
}

@Entity("insured_vehicles")
export class InsuredVehicle extends InsuredObject {
    // licensePlate: string
    // chassisNumber: string

    @PrimaryGeneratedColumn("uuid")
    id: string

    @OneToOne(() => InsuredObject, { eager: true })
    @JoinColumn({ name: "insured_object_id" })
    insuredObject: InsuredObject

    @Column('text', { default: 'car' })
    type_vehicle: string

    @Column()
    brand: string

    @Column()
    model: string

    @Column()
    year: number

    @Column()
    usage: string // particular, comercial, etc.

    @Column({ name: 'engine_capacity' })
    engineCapacity: string

    @Column({ name: 'fuel_type' })
    fuelType: string

    @Column({ name: 'has_alarm' })
    hasAlarm: boolean
}


@Entity("insured_house")
export class InsuredHouse extends InsuredObject { }