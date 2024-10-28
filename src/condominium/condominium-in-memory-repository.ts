import { CondominiumModelValidatorService } from '@src/shared/services/validators'
import { CondominiumModel } from './condominium.model'
import { ICondominiumParams } from './interfaces/i-condominium-params'
import { ICondominiumRepository } from './interfaces/i-condominium-repository'
import { ICondominiumRepositoryFilter } from './interfaces/i-condominium-repository-filter'

export class CondominiumInMemoryRepository implements ICondominiumRepository {
  private condominiums: Map<string, CondominiumModel> = new Map()
  private static instance: CondominiumInMemoryRepository
  private constructor() {}

  private matchesFilter(condo: CondominiumModel, filter: ICondominiumRepositoryFilter): boolean {
    // if (!condo.isActive) return false // TODO fix

    // This is a simpler approach than using keyof
    if (filter.id && condo.id !== filter.id) return false
    if (filter.name && !condo.name.includes(filter.name.toLowerCase())) return false
    if (filter.cnpj && condo.cnpj !== filter.cnpj) return false
    if (filter.address && !condo.address.includes(filter.address.toLowerCase())) return false

    return true
  }

  private filterCondominiums(
    filter: ICondominiumRepositoryFilter,
    isExcludent: boolean
  ): Array<CondominiumModel> {
    return Array.from(this.condominiums.values()).filter((condo) => {
      const matches = this.matchesFilter(condo, filter)
      return isExcludent ? !matches : matches
    })
  }

  public static getInstance(): CondominiumInMemoryRepository {
    if (!CondominiumInMemoryRepository.instance) {
      CondominiumInMemoryRepository.instance = new CondominiumInMemoryRepository()
    }
    return this.instance
  }

  async create(condominium: CondominiumModel): Promise<CondominiumModel> {
    this.condominiums.set(condominium.id!, condominium)
    return condominium
  }

  async getAll(filter: ICondominiumRepositoryFilter): Promise<Array<CondominiumModel>> {
    return this.filterCondominiums(filter, false)!
  }

  async getOne(filter: ICondominiumRepositoryFilter): Promise<CondominiumModel | null> {
    return (
      Array.from(this.condominiums.values()).find((condo) => this.matchesFilter(condo, filter)) ||
      null
    )
  }

  async update(condominiumParams: ICondominiumParams) {
    if (!this.condominiums.has(condominiumParams.id!)) return null

    const newCond = new CondominiumModel(
      condominiumParams,
      new CondominiumModelValidatorService(),
      this,
      { isBeingCreated: false }
    )
    this.condominiums.set(condominiumParams.id!, newCond)
    return newCond
  }

  async delete(filter: ICondominiumRepositoryFilter) {
    let affectedCondominiums = 0

    const condominiums = await this.getAll(filter)
    condominiums.forEach((condominium) => {
      condominium.deactivate()
      affectedCondominiums++
    })
    return affectedCondominiums
  }

  deleteAll() {
    this.condominiums.clear()
  }
}
