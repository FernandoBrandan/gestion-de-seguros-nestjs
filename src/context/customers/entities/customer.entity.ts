import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { ICustomer } from "@/common/interfaces/customer.interface"
import { typeIdentification } from '@/common/types/identificationType'

// domains/customer/entities/Customer.js
// class Customer {
//     constructor(id, personalData, contactInfo, riskProfile) {
//         this.id = id
//         this.personalData = personalData // nombre, documento, etc.
//         this.contactInfo = contactInfo
//         this.riskProfile = riskProfile // historial de siniestros, etc.
//     }
// }

@Entity('customers')
export class Customer implements ICustomer {
    @PrimaryGeneratedColumn("uuid")
    _id?: string

    @Column()
    name: string

    @Column()
    surname: string

    @Column({ type: 'date' })
    dateOfBirth: Date

    @Column()
    email: string

    @Column({ type: 'enum', enum: typeIdentification })
    identification_type: typeIdentification

    @Column()
    identification_number: string

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
