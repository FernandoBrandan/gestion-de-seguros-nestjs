import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common'
import { ExclusionService } from '../../services/exclusion.service'
import { CreateExclusionDto } from '../../dto/create-exclusion.dto'
import { UpdateExclusionDto } from '../../dto/update-exclusion.dto'

@Controller('exclusions')
export class ExclusionController {
    constructor(private readonly exclusionService: ExclusionService) { }

    @Post()
    create(
        @Body() createExclusionDto: CreateExclusionDto,
        @Headers('authorization') authorization: string,
    ) {
        return this.exclusionService.create(createExclusionDto)
    }

    @Get()
    findAll() {
        return this.exclusionService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.exclusionService.findOne(id)
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateExclusionDto: UpdateExclusionDto,
        @Headers('authorization') authorization: string
    ) {
        return this.exclusionService.update(id, updateExclusionDto)
    }

    @Delete(':id')
    remove(
        @Param('id') id: string,
        @Headers('authorization') authorization: string
    ) {
        return this.exclusionService.remove(id)
    }
}