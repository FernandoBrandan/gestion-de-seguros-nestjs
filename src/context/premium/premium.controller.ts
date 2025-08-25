import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common'
import { PremiumService } from '../../services/premium.service'
import { CreatePremiumDto } from '../../../premium/create-premium.dto'
import { UpdatePremiumDto } from '../../../premium/update-premium.dto'

@Controller('premiums')
export class PremiumController {
    constructor(private readonly PremiumService: PremiumService) { }

    @Post()
    create(
        @Body() CreatePremiumDto: CreatePremiumDto,
        @Headers('authorization') authorization: string,
    ) {
        return this.PremiumService.create(CreatePremiumDto)
    }

    @Get()
    findAll() {
        return this.PremiumService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.PremiumService.findOne(id)
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() UpdatePremiumDto: UpdatePremiumDto,
        @Headers('authorization') authorization: string
    ) {
        return this.PremiumService.update(id, UpdatePremiumDto)
    }

    @Delete(':id')
    remove(
        @Param('id') id: string,
        @Headers('authorization') authorization: string
    ) {
        return this.PremiumService.remove(id)
    }

}