import { Module } from '@nestjs/common'
import { InsurersService } from './insurers.service'
import { InsurersController } from './insurers.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Insurer } from './entities/insurer.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Insurer])],
  controllers: [InsurersController],
  providers: [InsurersService],
  exports: [TypeOrmModule],
})
export class InsurersModule { }
