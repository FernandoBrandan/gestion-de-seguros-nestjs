import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UsersModule } from './users/users.module'
import { PoliciesModule } from './context/policies/policies.module'
import { NotificationsService } from './-/notifications/notifications.service'
import { CustomersModule } from './context/customers/customers.module'
import { InsurersModule } from './context/insurers/insurers.module'

import { AuthModule } from './auth/auth.module'

@Module({
  imports: [

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'mydb',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Solo para desarrollo
    }),

    UsersModule,
    PoliciesModule,
    CustomersModule,
    InsurersModule,

    AuthModule,
  ],
  controllers: [],
  providers: [NotificationsService],
})
export class AppModule { }
