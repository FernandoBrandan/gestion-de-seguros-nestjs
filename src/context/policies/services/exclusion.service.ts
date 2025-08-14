import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateExclusionDto } from '../dto/create-exclusion.dto'
import { UpdateExclusionDto } from '../dto/update-exclusion.dto'

import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Exclusion } from '../domain/entities/exclusion.entity'

@Injectable()
export class ExclusionService {
    constructor(
        @InjectRepository(Exclusion)
        private readonly exclusionRepository: Repository<Exclusion>
    ) { }

    async create(createExclusionDto: CreateExclusionDto): Promise<Exclusion> {
        const newExclusion = this.exclusionRepository.create(createExclusionDto)
        return await this.exclusionRepository.save(newExclusion)
    }

    async findAll(): Promise<Exclusion[]> {
        return await this.exclusionRepository.find()
    }

    async findOne(id: string): Promise<Exclusion> {
        const exclusion = await this.exclusionRepository.findOneBy({ _id: id })
        if (!exclusion) throw new NotFoundException(`Exclusion with ID ${id} not found`)
        return exclusion
    }

    async update(id: string, updateExclusionDto: UpdateExclusionDto) {
        const exclusion = await this.exclusionRepository.findOneBy({ _id: id })
        if (!exclusion) throw new NotFoundException(`Exclusion with ID ${id} not found`)
        return await this.exclusionRepository.update(id, updateExclusionDto)
    }

    async remove(id: string): Promise<void> {
        const result = await this.exclusionRepository.delete({ _id: id })
        if (result.affected === 0) throw new NotFoundException(`Exclusion #${id} not found`)
    }
}
