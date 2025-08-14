import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateInsuredObjectDto } from '../dto/create-insuredObject.dto'
import { UpdateInsuredObjectDto } from '../dto/update-insuredObject.dto'

import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { InsuredObject } from '../domain/entities/insuredObject.entity'

@Injectable()
export class InsuredObjectService {
    constructor(
        @InjectRepository(InsuredObject)
        private readonly insuredObjectRepository: Repository<InsuredObject>
    ) { }

    async create(createInsuredObjectDto: CreateInsuredObjectDto): Promise<InsuredObject> {
        const newInsuredObject = this.insuredObjectRepository.create(createInsuredObjectDto)
        return await this.insuredObjectRepository.save(newInsuredObject)
    }

    async findAll(): Promise<InsuredObject[]> {
        return await this.insuredObjectRepository.find()
    }

    async findOne(id: string): Promise<InsuredObject> {
        const insuredObject = await this.insuredObjectRepository.findOneBy({ _id: id })
        if (!insuredObject) throw new NotFoundException(`InsuredObject with ID ${id} not found`)
        return insuredObject
    }

    async update(id: string, updateInsuredObjectDto: UpdateInsuredObjectDto) {
        const insuredObject = await this.insuredObjectRepository.findOneBy({ _id: id })
        if (!insuredObject) throw new NotFoundException(`InsuredObject with ID ${id} not found`)
        return await this.insuredObjectRepository.update(id, updateInsuredObjectDto)
    }

    async remove(id: string): Promise<void> {
        const result = await this.insuredObjectRepository.delete({ _id: id })
        if (result.affected === 0) throw new NotFoundException(`InsuredObject #${id} not found`)
    }
}
