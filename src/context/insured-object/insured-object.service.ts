import { Injectable } from '@nestjs/common';
import { CreateInsuredObjectDto } from './dto/create-insured-object.dto';
import { UpdateInsuredObjectDto } from './dto/update-insured-object.dto';

@Injectable()
export class InsuredObjectService {
  create(createInsuredObjectDto: CreateInsuredObjectDto) {
    return 'This action adds a new insuredObject';
  }

  findAll() {
    return `This action returns all insuredObject`;
  }

  findOne(id: number) {
    return `This action returns a #${id} insuredObject`;
  }

  update(id: number, updateInsuredObjectDto: UpdateInsuredObjectDto) {
    return `This action updates a #${id} insuredObject`;
  }

  remove(id: number) {
    return `This action removes a #${id} insuredObject`;
  }
}
