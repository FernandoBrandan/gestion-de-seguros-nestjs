import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { User } from './user.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const newUser = this.userRepository.create(createUserDto)
      return await this.userRepository.save(newUser)
    } catch (error) {
      if (
        error.code === '23505' || // Código postgres para duplicados        
        error.message.includes('duplicate key value')
      ) {
        throw new ConflictException('Email already exists')
      }
      throw error
    }
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find()
  }

  async findOneBy(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ _id: id })
    if (!user) throw new NotFoundException(`User #${id} not found`)
    return user
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email })
    if (!user) throw new NotFoundException(`User with email ${email} not found`)
    return user
  }

  async findByEmailWithPassword(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email },
      select: ['_id', 'name', 'email', 'role', 'password']
    })
    if (!user) throw new NotFoundException(`User with email ${email} not found`)
    return user
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ _id: id })
    if (!user) throw new NotFoundException(`User #${id} not found`)
    await this.userRepository.update({ _id: id }, updateUserDto)
    return this.findOneBy(id)
  }

  async remove(id: string): Promise<void> {
    const result = await this.userRepository.softDelete({ _id: id })
    if (result.affected === 0) throw new NotFoundException(`User #${id} not found`)
  }
}
