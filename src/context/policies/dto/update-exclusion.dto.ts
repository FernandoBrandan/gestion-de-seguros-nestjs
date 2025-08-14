import { PartialType } from '@nestjs/mapped-types'
import { CreateExclusionDto } from './create-exclusion.dto'

export class UpdateExclusionDto extends PartialType(CreateExclusionDto) { }
