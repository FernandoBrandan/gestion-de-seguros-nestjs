import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { IUser } from "../user/user.interface"
import { typeRole } from '../common/role.enum'

@Entity('users')
export class User implements IUser {
    @PrimaryGeneratedColumn("uuid")
    _id?: string

    @Column({ nullable: false })
    name: string

    @Column({ nullable: false })
    surname: string

    @Column({ nullable: false })
    dateOfBirth: Date

    @Column({ select: false, nullable: false })
    password: string

    @Column({ unique: true, nullable: false })
    email: string

    @Column({ type: 'enum', enum: typeRole, default: typeRole.AGENTE, nullable: false })
    role: typeRole

    @Column({ default: true })
    activo: boolean

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt?: Date
}