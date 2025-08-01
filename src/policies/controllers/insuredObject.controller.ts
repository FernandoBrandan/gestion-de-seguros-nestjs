import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common'
import { InsuredObjectService } from '../services/insuredObject.service'
import { CreateInsuredObjectDto } from '../dto/create-insuredObject.dto'
import { UpdateInsuredObjectDto } from '../dto/update-insuredObject.dto'

@Controller('insured-objects')
export class InsuredObjectController {
    constructor(private readonly insuredObjectService: InsuredObjectService) { }

    @Post()
    create(
        @Body() createInsuredObjectDto: CreateInsuredObjectDto,
        @Headers('authorization') authorization: string,
    ) {
        return this.insuredObjectService.create(createInsuredObjectDto)
    }

    @Get()
    findAll() {
        return this.insuredObjectService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.insuredObjectService.findOne(id)
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateInsuredObjectDto: UpdateInsuredObjectDto,
        @Headers('authorization') authorization: string
    ) {
        return this.insuredObjectService.update(id, updateInsuredObjectDto)
    }

    @Delete(':id')
    remove(
        @Param('id') id: string,
        @Headers('authorization') authorization: string
    ) {
        return this.insuredObjectService.remove(id)
    }
}