import {
    IsString,
    IsEnum,
    Length,
    IsNotEmpty,
} from 'class-validator'
import { Type, Transform } from 'class-transformer'

import { IExclusion } from '../interfaces/exclusion.interface'

export class CreateExclusionDto implements Omit<IExclusion, '_id'> {
    @IsString()
    @IsNotEmpty()
    @Length(2, 100)
    name: string

    @IsString()
    @IsNotEmpty()
    @Length(10, 500)
    description: string

    @IsEnum(['GENERAL', 'SPECIFIC'])
    type: 'GENERAL' | 'SPECIFIC'
}