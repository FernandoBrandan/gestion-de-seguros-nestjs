import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateClaimDto } from '../dto/create-claim.dto'
import { UpdateClaimDto } from '../dto/update-claim.dto'

import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Claim } from '../domain/entities/claim.entity'

@Injectable()
export class ClaimsService {
    constructor(
        @InjectRepository(Claim)
        private readonly claimsRepository: Repository<Claim>
    ) { }

    async create(createClaimDto: CreateClaimDto): Promise<Claim> {
        const newClaim = this.claimsRepository.create(createClaimDto)
        return await this.claimsRepository.save(newClaim)
    }

    async findAll(): Promise<Claim[]> {
        return await this.claimsRepository.find()
    }

    async findOne(id: string): Promise<Claim> {
        const claim = await this.claimsRepository.findOneBy({ _id: id })
        if (!claim) throw new NotFoundException(`Claim with ID ${id} not found`)
        return claim
    }

    async update(id: string, updateClaimDto: UpdateClaimDto) {
        const updateClaim = await this.claimsRepository.findOneBy({ _id: id })
        if (!updateClaim) throw new NotFoundException(`Claim with ID ${id} not found`)
        return await this.claimsRepository.update(id, updateClaim)
    }

    async remove(id: string): Promise<void> {
        const result = await this.claimsRepository.delete({ _id: id })
        if (result.affected === 0) throw new NotFoundException(`Claim #${id} not found`)
    }
}
