import { DataSource } from 'typeorm'
import { typeRole } from '@/common/role.enum'
import { User } from '../users/entities/user.entity'

// 👇 configuración base de tu conexión
export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || '123',
    database: process.env.DB_NAME || 'mydb',
    synchronize: false, // en prod siempre false (usá migraciones)
    logging: false,
    entities: [User], // importás todas tus entidades acá
    migrations: ['src/database/migrations/*.ts'],
})