import { PartialType } from '@nestjs/mapped-types'
import { CreateInsuredObjectDto } from './create-insuredObject.dto'

export class UpdateInsuredObjectDto extends PartialType(CreateInsuredObjectDto) { }
