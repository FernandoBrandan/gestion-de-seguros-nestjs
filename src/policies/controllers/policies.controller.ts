import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common'
import { PoliciesService } from '../services/policies.service'
import { CreatePolicyDto } from '../dto/create-policy.dto'
import { UpdatePolicyDto } from '../dto/update-policy.dto'

@Controller('policies')
export class PoliciesController {
  constructor(private readonly policiesService: PoliciesService) { }

  @Post()
  create(
    @Body() createPolicyDto: CreatePolicyDto,
    @Headers('authorization') authorization: string,
  ) {
    return this.policiesService.create(createPolicyDto)
  }

  @Get()
  findAll() {
    // return this.policiesService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.policiesService.findOne(id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePolicyDto: UpdatePolicyDto,
    @Headers('authorization') authorization: string
  ) {
    return this.policiesService.update(id, updatePolicyDto)
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Headers('authorization') authorization: string
  ) {
    // return this.policiesService.remove(id)
  }
}
