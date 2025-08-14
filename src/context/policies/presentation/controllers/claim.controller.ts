import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common'
import { ClaimsService } from '../../services/claim.service'
import { CreateClaimDto } from '../../dto/create-claim.dto'
import { UpdateClaimDto } from '../../dto/update-claim.dto'

@Controller('claims')
export class ClaimsController {
    constructor(private readonly claimsService: ClaimsService) { }

    @Post()
    create(
        @Body() createClaimDto: CreateClaimDto,
        @Headers('authorization') authorization: string,
    ) {
        return this.claimsService.create(createClaimDto)
    }

    @Get()
    findAll() {
        return this.claimsService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.claimsService.findOne(id)
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateClaimDto: UpdateClaimDto,
        @Headers('authorization') authorization: string
    ) {
        return this.claimsService.update(id, updateClaimDto)
    }

    @Delete(':id')
    remove(
        @Param('id') id: string,
        @Headers('authorization') authorization: string
    ) {
        return this.claimsService.remove(id)
    }
}