import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { PoliciesController } from './controllers/policies.controller'
import { PoliciesService } from './services/policies.service'
import { Policy } from './entities/policy.entity'

import { CustomersModule } from '../customers/customers.module'
import { Customer } from '../customers/entities/customer.entity'

import { InsurersModule } from '../insurers/insurers.module'
import { Insurer } from '../insurers/entities/insurer.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Policy, Customer, Insurer]),
    CustomersModule,
    InsurersModule,
  ],
  controllers: [PoliciesController],
  providers: [PoliciesService],
})
export class PoliciesModule { }
