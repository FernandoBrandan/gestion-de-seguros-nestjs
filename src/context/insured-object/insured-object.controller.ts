import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { InsuredObjectService } from './insured-object.service'
import { CreateInsuredObjectDto } from './dto/create-insured-object.dto'
import { UpdateInsuredObjectDto } from './dto/update-insured-object.dto'

@Controller('insured-objects')
export class InsuredObjectController {
  constructor(private readonly insuredObjectService: InsuredObjectService) { }

  @Post()
  create(@Body() createInsuredObjectDto: CreateInsuredObjectDto) {
    return this.insuredObjectService.create(createInsuredObjectDto)
  }

  @Get()
  findAll() {
    return this.insuredObjectService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.insuredObjectService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInsuredObjectDto: UpdateInsuredObjectDto) {
    return this.insuredObjectService.update(+id, updateInsuredObjectDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.insuredObjectService.remove(+id)
  }
}
