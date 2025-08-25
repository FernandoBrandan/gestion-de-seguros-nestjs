// src/policies/services/policies.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, DataSource, QueryRunner } from 'typeorm'

// Entities
import { Policy } from '../domain/entities/policy.entity'
import { InsuredObject } from '../domain/entities/insuredObject.entity'
import { Coverage } from '../domain/entities/coverage.entity'
import { Exclusion } from '../domain/entities/exclusion.entity'
import { Premium } from '../../premium/premium.entity'
import { Payment } from '../domain/entities/payment.entity'
import { Claim } from '../domain/entities/claim.entity'

// Externals
import { CustomersService } from '../../customers/customers.service'
import { Customer } from '../../customers/entities/customer.entity'
import { InsurersService } from '../../insurers/insurers.service'
import { Insurer } from '../../insurers/entities/insurer.entity'

// DTOs
import { CreatePolicyDto } from '../dto/create-policy.dto'
import { UpdatePolicyDto } from '../dto/update-policy.dto'
// import { PolicyQueryDto } from '../dto/policy-query.dto'

@Injectable()
export class PoliciesService {
  constructor(
    @InjectRepository(Policy)
    private readonly policyRepository: Repository<Policy>,

    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,

    @InjectRepository(Insurer)
    private readonly insurerRepository: Repository<Insurer>,

    /** *********************** */

    /** *********************** */

    private readonly dataSource: DataSource
  ) { }

  async create(createPolicyDto: CreatePolicyDto): Promise<Policy> {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      /**
       * Paso a paso
       * Primero validar que existan los insurer, policyholder y customer - ok ✅ 
       * 
       * Entidades INTERNAS (se crean junto con Policy):
       * 🔄 InsuredObject
       * 🔄 Premium
       * 🔄 Coverage[]
       * 🔄 Exclusion[]
       * 
       * 🔄 Payment[] (opcional al inicio)
       * 🔄 Claim[] (se crea después, durante la vida de la póliza)
       */

      const { insurerId, policyholderId, insuredId } = createPolicyDto
      const getInsurer = await this.insurerRepository.findOneBy({ _id: insurerId })
      const getpolicyholderId = await this.customerRepository.findOneBy({ _id: policyholderId })
      const getInsured = await this.customerRepository.findOneBy({ _id: insuredId })
      if (!getInsured && !getInsurer && !getpolicyholderId) throw new NotFoundException

      // if (getInsured.status && getInsurer.status && getpolicyholderId.status) { }

      if (createPolicyDto.effectiveDate < createPolicyDto.expirationDate) {
        throw new NotFoundException
      }

      const unique_policyNumber = '123456789'

      /**
       * 1. Crear Policy:
         ├── policyNumber, applicationNumber
         ├── issueDate, effectiveDate, expirationDate
         ├── Referencias FK: insurerId, policyholderId, insuredId
         ├── Status: IN_PROCESS
         └── Metadata básica      
       */

      /**
       * 2. Crear objetos internos relacionados:
         ├── InsuredObject (OneToOne)
         ├── Premium (OneToOne) 
         ├── Coverages[] (OneToMany)
         ├── Exclusions[] (OneToMany)
         └── Beneficiaries (ManyToMany - solo vincular)
       */

      /**
       * Post-creación:
         ├── Validar completitud de objetos internos
         ├── Validar coherencia entre coverages y premium
         └── Validar reglas de negocio específicas
       */

      /**
       * 3. Actualizar status:
         └── Policy.status = ACTIVE (si todo OK)
       */


      // 1. Crear el objeto asegurado
      const insuredObject = queryRunner.manager.create(InsuredObject, createPolicyDto.insuredObject)
      const savedInsuredObject = await queryRunner.manager.save(insuredObject)

      // 2. Crear la prima
      const premium = queryRunner.manager.create(Premium, createPolicyDto.premium)
      const savedPremium = await queryRunner.manager.save(premium)

      // 3. Crear la póliza principal
      const policy = queryRunner.manager.create(Policy, {
        ...createPolicyDto,
        insuredObject: savedInsuredObject,
        premium: savedPremium
      })
      const savedPolicy = await queryRunner.manager.save(policy)

      // 4. Crear las coberturas
      if (createPolicyDto.coverages?.length > 0) {
        const coverages = createPolicyDto.coverages.map(coverageDto =>
          queryRunner.manager.create(Coverage, {
            ...coverageDto,
            policy: savedPolicy
          })
        )
        await queryRunner.manager.save(coverages)
      }

      // 5. Crear las exclusiones
      if (createPolicyDto.exclusions?.length > 0) {
        const exclusions = createPolicyDto.exclusions.map(exclusionDto =>
          queryRunner.manager.create(Exclusion, {
            ...exclusionDto,
            policy: savedPolicy
          })
        )
        await queryRunner.manager.save(exclusions)
      }

      // 6. Crear historial de pagos inicial
      if (createPolicyDto.paymentHistory?.length > 0) {
        const payments = createPolicyDto.paymentHistory.map(paymentDto =>
          queryRunner.manager.create(Payment, {
            ...paymentDto,
            policy: savedPolicy
          })
        )
        await queryRunner.manager.save(payments)
      }

      await queryRunner.commitTransaction()

      // Retornar la póliza completa con todas las relaciones
      return this.findOne(savedPolicy._id)

    } catch (error) {

      /**
       * Si falla cualquier paso:
         ├── ROLLBACK completo
         ├── Policy queda en estado: FAILED/DRAFT
         ├── Log detallado del error
         └── Notificación al usuario
       */
      await queryRunner.rollbackTransaction()
      throw new BadRequestException(`Error creating policy: ${error.message}`)
    } finally {
      await queryRunner.release()
    }
  }













  async findAll(queryDto) {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'DESC', ...filters } = queryDto

    const queryBuilder = this.policyRepository
      .createQueryBuilder('policy')
      .leftJoinAndSelect('policy.insuredObject', 'insuredObject')
      .leftJoinAndSelect('policy.premium', 'premium')
      .leftJoinAndSelect('policy.coverages', 'coverages')
      .leftJoinAndSelect('policy.exclusions', 'exclusions')
      .leftJoinAndSelect('policy.paymentHistory', 'payments')
      .leftJoinAndSelect('policy.claims', 'claims')
      .leftJoinAndSelect('policy.insurer', 'insurer')
      .leftJoinAndSelect('policy.policyholder', 'policyholder')
      .leftJoinAndSelect('policy.insured', 'insured')

    // Aplicar filtros
    if (filters.policyNumber) {
      queryBuilder.andWhere('policy.policyNumber ILIKE :policyNumber', {
        policyNumber: `%${filters.policyNumber}%`
      })
    }

    if (filters.status) {
      queryBuilder.andWhere('policy.status = :status', { status: filters.status })
    }

    if (filters.insurerId) {
      queryBuilder.andWhere('policy.insurerId = :insurerId', { insurerId: filters.insurerId })
    }

    if (filters.insuranceType) {
      queryBuilder.andWhere('insuredObject.type = :type', { type: filters.insuranceType })
    }

    if (filters.effectiveDateFrom) {
      queryBuilder.andWhere('policy.effectiveDate >= :effectiveDateFrom', {
        effectiveDateFrom: filters.effectiveDateFrom
      })
    }

    if (filters.effectiveDateTo) {
      queryBuilder.andWhere('policy.effectiveDate <= :effectiveDateTo', {
        effectiveDateTo: filters.effectiveDateTo
      })
    }

    if (filters.search) {
      queryBuilder.andWhere(`(
                policy.policyNumber ILIKE :search OR 
                policy.applicationNumber ILIKE :search OR
                insuredObject.description ILIKE :search
            )`, { search: `%${filters.search}%` })
    }

    // Ordenación y paginación
    queryBuilder
      .orderBy(`policy.${sortBy}`, sortOrder)
      .skip((page - 1) * limit)
      .take(limit)

    const [policies, total] = await queryBuilder.getManyAndCount()

    return {
      data: policies,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    }
  }

  async findOne(id: string): Promise<Policy> {
    const policy = await this.policyRepository.findOne({
      where: { _id: id },
      relations: ['insuredObject', 'premium', 'coverages', 'exclusions', 'paymentHistory',
        'claims', 'insurer', 'policyholder', 'insured', 'beneficiaries']
    })
    if (!policy) throw new NotFoundException(`Policy with ID ${id} not found`)
    return policy
  }

  async update(id: string, updatePolicyDto: UpdatePolicyDto): Promise<Policy> {
    const policy = await this.findOne(id)

    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      // Actualizar la póliza principal
      await queryRunner.manager.update(Policy, id, updatePolicyDto)

      // Actualizar entidades relacionadas si están incluidas
      if (updatePolicyDto.premium) {
        await queryRunner.manager.update(Premium, { policy: { id } }, updatePolicyDto.premium)
      }

      if (updatePolicyDto.insuredObject) {
        await queryRunner.manager.update(InsuredObject, { policy: { id } }, updatePolicyDto.insuredObject)
      }

      // Para arrays como coberturas, exclusiones, etc., necesitarías lógica más compleja
      // de eliminar existentes y crear nuevos, o usar una estrategia de merge

      await queryRunner.commitTransaction()

      return this.findOne(id)

    } catch (error) {
      await queryRunner.rollbackTransaction()
      throw new BadRequestException(`Error updating policy: ${error.message}`)
    } finally {
      await queryRunner.release()
    }
  }

  /** ************************************************************************************************************************* */

  /** 
  // Métodos específicos para manejar entidades relacionadas
  async addCoverage(policyId: string, coverageData: any): Promise<Coverage> {
    const policy = await this.findOne(policyId)

    const coverage = this.coverageRepository.create({
      ...coverageData,
      policy
    })

    return this.coverageRepository.save(coverage)
  }

  async removeCoverage(policyId: string, coverageId: string): Promise<void> {
    const coverage = await this.coverageRepository.findOne({
      where: { id: coverageId, policy: { id: policyId } }
    })

    if (!coverage) {
      throw new NotFoundException('Coverage not found')
    }

    await this.coverageRepository.remove(coverage)
  }

  async addClaim(policyId: string, claimData: any): Promise<Claim> {
    const policy = await this.findOne(policyId)

    const claim = this.claimRepository.create({
      ...claimData,
      policy
    })

    return this.claimRepository.save(claim)
  }

  // Otros métodos útiles...
  async getPolicyStats(insurerId?: string) {
    const queryBuilder = this.policyRepository.createQueryBuilder('policy')

    if (insurerId) {
      queryBuilder.where('policy.insurerId = :insurerId', { insurerId })
    }

    return queryBuilder
      .select('policy.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .groupBy('policy.status')
      .getRawMany()
  }
  
  */
}