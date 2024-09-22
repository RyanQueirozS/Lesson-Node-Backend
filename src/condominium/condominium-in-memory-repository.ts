import { CondominiumModelValidatorService } from '@src/shared/services/validators'
import { CondominiumModel } from './condominium.model'
import { ICondominiumParams } from './interfaces/icondominium-params'
import { ICondominiumRepository } from './interfaces/icondominium-repository'

export class CondominiumInMemoryRepository implements ICondominiumRepository {
  private condominiums: Map<string, CondominiumModel> = new Map()
  private static instance: CondominiumInMemoryRepository
  private constructor() {}

  public static getInstance(): CondominiumInMemoryRepository {
    if (!CondominiumInMemoryRepository.instance) {
      CondominiumInMemoryRepository.instance =
        new CondominiumInMemoryRepository()
    }
    return this.instance
  }

  async create(condominium: CondominiumModel): Promise<CondominiumModel> {
    this.condominiums.set(condominium.id!, condominium)
    return condominium
  }

  async getAll(): Promise<Array<CondominiumModel>> {
    let allCondominiums = Array<CondominiumModel>()
    this.condominiums.forEach((condominium: CondominiumModel, _: string) => {
      allCondominiums.push(condominium)
    })
    return allCondominiums
  }

  async getOne(id: string) {
    let condominium: CondominiumModel = null!
    // TODO redo with a break statement and/or more readable loop/builtin find function
    this.condominiums.forEach((cond: CondominiumModel, condID: string) => {
      if (id == condID) {
        condominium = cond
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
