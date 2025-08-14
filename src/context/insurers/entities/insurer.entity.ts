import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { IInsurer, typeIdentification } from "../insurer/insurer.interface"

@Entity('insurers')
export class Insurer implements IInsurer {
    @PrimaryGeneratedColumn("uuid")
    _id?: string

    @Column()
    razonSocial: string

    @Column()
    email: string

    @Column({ type: 'enum', enum: typeIdentification })
    identification_type: typeIdentification

    @Column()
    identification_number: string

    @Column()
    numeroRegistro: string

    @Column()
    licencia: string

    @Column()
    phone_area_code: string

    @Column()
    phone_number: string

    @Column()
    street_name: string

    @Column({ type: 'int' })
    street_number: number

    @Column()
    zip_code: string

    @Column()
    city: string

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt: Date
}