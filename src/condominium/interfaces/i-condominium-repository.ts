import { CondominiumModel } from '../condominium.model'
import { ICondominiumParams } from './i-condominium-params'
import { ICondominiumRepositoryFilter } from './i-condominium-repository-filter'

export interface ICondominiumRepository {
  create(condominium: ICondominiumParams): Promise<CondominiumModel>
  getAll(filter: ICondominiumRepositoryFilter): Promise<Array<CondominiumModel>>
  getOne(filter: ICondominiumRepositoryFilter): Promise<CondominiumModel | null>
  update(
    condominiumParams: ICondominiumParams
  ): Promise<CondominiumModel | null>
}
