import { Module } from '@nestjs/common';
import { InsuredObjectService } from './insured-object.service';
import { InsuredObjectController } from './insured-object.controller';

@Module({
  controllers: [InsuredObjectController],
  providers: [InsuredObjectService],
})
export class InsuredObjectModule {}
