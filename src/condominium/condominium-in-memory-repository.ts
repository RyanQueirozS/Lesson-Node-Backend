import { CondominiumModelValidatorService } from '@src/shared/services/validators'
import { CondominiumModel } from './condominium.model'
import { ICondominiumParams } from './interfaces/i-condominium-params'
import { ICondominiumRepository } from './interfaces/i-condominium-repository'
import { ICondominiumRepositoryFilter } from './interfaces/i-condominium-repository-filter'

export class CondominiumInMemoryRepository implements ICondominiumRepository {
  private condominiums: Map<string, CondominiumModel> = new Map()
  private static instance: CondominiumInMemoryRepository
  private constructor() {}

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
    const allCondominiums: Array<CondominiumModel> = []

    this.condominiums.forEach((value, key) => {
      let match = true

      for (const k of Object.keys(filter) as Array<keyof ICondominiumRepositoryFilter>) {
        if (filter[k] !== undefined && value[k] !== filter[k]) {
          match = false
          break
        }
      }

      if (match) {
        allCondominiums.push(value)
      }
    })

    return allCondominiums
  }

  async getOne(filter: ICondominiumRepositoryFilter): Promise<CondominiumModel | null> {
    let condominium: CondominiumModel | null = null

    this.condominiums.forEach((cond: CondominiumModel) => {
      let match = true

      for (const k of Object.keys(filter) as Array<keyof ICondominiumRepositoryFilter>) {
        if (filter[k] !== undefined && cond[k] !== filter[k]) {
          match = false
          break
        }
      }

      if (match) {
        condominium = cond
        return // Returns to break the foreach
      }
    })

    return condominium
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

  async delete(id: string): Promise<CondominiumModel | null> {
    const cond = this.condominiums.get(id)
    if (cond) {
      this.condominiums.delete(id)
      return cond
    }
    return null
  }
}
