import { PartialType } from '@nestjs/mapped-types';
import { CreateInsuredObjectDto } from './create-insured-object.dto';

export class UpdateInsuredObjectDto extends PartialType(CreateInsuredObjectDto) {}
