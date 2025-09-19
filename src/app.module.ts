import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'

// step0
import { CustomersModule } from './context/customers/customers.module'
import { InsuredObjectModule } from './context/insured-object/insured-object.module'

// step1
// import { QuotationsModule } from './context/quotations/quotations.module'
// import { UnderwritingModule } from './context/underwriting/underwriting.module'

// import { PoliciesModule } from './context/Step2/policies/policies.module'
// import { NotificationsService } from './-/notifications/notifications.service'
// import { InsurersModule } from './context/Step2/insurers/insurers.module'  


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

    AuthModule,
    UsersModule,
    CustomersModule,
    InsuredObjectModule,

    // QuotationsModule,
    // UnderwritingModule,

    // PoliciesModule,
    // InsurersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
