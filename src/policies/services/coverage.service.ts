import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateCoverageDto } from '../dto/create-coverage.dto'
import { UpdateCoverageDto } from '../dto/update-coverage.dto'

import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Coverage } from '../entities/coverage.entity'

@Injectable()
export class CoverageService {
    constructor(
        @InjectRepository(Coverage)
        private readonly coverageRepository: Repository<Coverage>
    ) { }

    async create(createCoverageDto: CreateCoverageDto): Promise<Coverage> {
        const coverage = this.coverageRepository.create(createCoverageDto)
        return await this.coverageRepository.save(coverage)
    }

    async findAll(): Promise<Coverage[]> {
        return await this.coverageRepository.find()
    }

    async findOne(id: string): Promise<Coverage> {
        const coverage = await this.coverageRepository.findOneBy({ _id: id })
        if (!coverage) throw new NotFoundException(`Coverage with ID ${id} not found`)
        return coverage
    }

    async update(id: string, updateCoverageDto: UpdateCoverageDto) {
        const coverage = await this.coverageRepository.findOneBy({ _id: id })
        if (!coverage) throw new NotFoundException(`Coverage with ID ${id} not found`)
        return await this.coverageRepository.update(id, updateCoverageDto)
    }

    async remove(id: string): Promise<void> {
        const result = await this.coverageRepository.delete({ _id: id })
        if (result.affected === 0) throw new NotFoundException(`Coverage #${id} not found`)
    }
}

