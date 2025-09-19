import { DataSource } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { User } from '../../users/entities/user.entity'
import { typeRole } from '../../common/role.enum'
import { AppDataSource } from '../data-source'

async function runSeed() {
    await AppDataSource.initialize()
    const userRepo = AppDataSource.getRepository(User)
    const exists = await userRepo.findOne({ where: { role: typeRole.SUPER_ADMIN } })
    if (!exists) {
        const password = await bcrypt.hash('superadmin123', 10)
        const superAdmin = userRepo.create({
            name: 'superadmin',
            surname: 'superadmin',
            dateOfBirth: Date.now().toString(),
            password,
            email: 'superadmin@example.com',
            role: typeRole.SUPER_ADMIN,
            activo: true
        })

        await userRepo.save(superAdmin)
        console.log('✅ SUPER_ADMIN creado')
    }
    // else {
    //     console.log('ℹ️ SUPER_ADMIN ya existe, no se crea otro')
    // }
    await AppDataSource.destroy()
}

runSeed().catch((err) => console.error('❌ Error ejecutando seed:', err))
