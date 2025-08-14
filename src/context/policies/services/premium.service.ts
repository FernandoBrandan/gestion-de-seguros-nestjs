import { Injectable, NotFoundException } from '@nestjs/common'
import { CreatePremiumDto } from '../dto/create-premium.dto'
import { UpdatePremiumDto } from '../dto/update-premium.dto'

import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Premium } from '../domain/entities/premium.entity'

@Injectable()
export class PremiumService {
    constructor(
        @InjectRepository(Premium)
        private readonly premiumRepository: Repository<Premium>
    ) { }

    async create(createPremiumDto: CreatePremiumDto): Promise<Premium> {
        const newPremium = this.premiumRepository.create(createPremiumDto)
        return await this.premiumRepository.save(newPremium)
    }

    async findAll(): Promise<Premium[]> {
        return await this.premiumRepository.find()
    }

    async findOne(id: string): Promise<Premium> {
        const premium = await this.premiumRepository.findOneBy({ _id: id })
        if (!premium) throw new NotFoundException(`Premium with ID ${id} not found`)
        return premium
    }

    async update(id: string, updatePremiumDto: UpdatePremiumDto) {
        const premium = await this.premiumRepository.findOneBy({ _id: id })
        if (!premium) throw new NotFoundException(`Premium with ID ${id} not found`)
        return await this.premiumRepository.update(id, updatePremiumDto)
    }

    async remove(id: string): Promise<void> {
        const result = await this.premiumRepository.delete({ _id: id })
        if (result.affected === 0) throw new NotFoundException(`Premium #${id} not found`)
    }
}
