import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common'
import { CoverageService } from '../../services/coverage.service'
import { CreateCoverageDto } from '../../dto/create-coverage.dto'
import { UpdateCoverageDto } from '../../dto/update-coverage.dto'

@Controller('coverages')
export class CoverageController {
    constructor(private readonly coverageService: CoverageService) { }

    @Post()
    create(
        @Body() createCoverageDto: CreateCoverageDto,
        @Headers('authorization') authorization: string,
    ) {
        return this.coverageService.create(createCoverageDto)
    }

    @Get()
    findAll() {
        return this.coverageService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.coverageService.findOne(id)
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateCoverageDto: UpdateCoverageDto,
        @Headers('authorization') authorization: string
    ) {
        return this.coverageService.update(id, updateCoverageDto)
    }

    @Delete(':id')
    remove(
        @Param('id') id: string,
        @Headers('authorization') authorization: string
    ) {
        return this.coverageService.remove(id)
    }
}