import { Injectable, NotFoundException } from '@nestjs/common'
import { CreatePaymentDto } from '../dto/create-payment.dto'
import { UpdatePaymentDto } from '../dto/update-payment.dto'

import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Payment } from '../domain/entities/payment.entity'

@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(Payment)
        private readonly paymentRepository: Repository<Payment>
    ) { }

    async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
        const newPayment = this.paymentRepository.create(createPaymentDto)
        return await this.paymentRepository.save(newPayment)
    }

    async findAll(): Promise<Payment[]> {
        return await this.paymentRepository.find()
    }

    async findOne(id: string): Promise<Payment> {
        const payment = await this.paymentRepository.findOneBy({ _id: id })
        if (!payment) throw new NotFoundException(`Payment with ID ${id} not found`)
        return payment
    }

    async update(id: string, updatePaymentDto: UpdatePaymentDto) {
        const payment = await this.paymentRepository.findOneBy({ _id: id })
        if (!payment) throw new NotFoundException(`Payment with ID ${id} not found`)
        return await this.paymentRepository.update(id, updatePaymentDto)
    }

    async remove(id: string): Promise<void> {
        const result = await this.paymentRepository.delete({ _id: id })
        if (result.affected === 0) throw new NotFoundException(`Payment #${id} not found`)
    }
}
