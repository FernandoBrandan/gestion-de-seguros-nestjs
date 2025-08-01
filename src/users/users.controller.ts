import { Controller, Get, Post, Body, Patch, Param, Delete, Headers, Query, UseGuards } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

import { Auth } from '../auth/decorators/auth.decorator'
import { Roles } from '../auth/decorators/roles.decorator'

import { AuthGuard } from '../auth/guard/auth.guard'
import { RolesGuard } from '../auth/guard/roles.guard'

import { typeRole } from '../common/role.enum'

// Ver libreria de roles ... si declaramos un rol inferior el admin deberia tener permisos igual

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @Auth(typeRole.ADMIN)
  // @Roles(typeRole.ADMIN)
  // @UseGuards(AuthGuard, RolesGuard)
  create(
    @Body() createUserDto: CreateUserDto,
    @Headers('authorization') authorization: string,
  ) {
    return this.usersService.create(createUserDto)
  }

  @Get()
  findAll() {
    return this.usersService.findAll()
  }

  @Get(':id')
  findOneBy(@Param('id') id: string) {
    return this.usersService.findOneBy(id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Headers('authorization') authorization: string
  ) {
    return this.usersService.update(id, updateUserDto)
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Headers('authorization') authorization: string
  ) {
    return this.usersService.remove(id)
  }

  @Get('filter')
  filter(
    @Query('filter') filter: string,
    @Query('sort') sort: string,
    @Query('limit') limit: number,
    @Query('offset') offset: number
  ) {
    console.log('filter', filter, '\n')
    console.log('sort', sort, '\n')
    console.log('limit', limit, '\n')
    console.log('offset', offset, '\n')
    // return this.usersService.findFilter(filter, sort, limit, offset)
  }
}
