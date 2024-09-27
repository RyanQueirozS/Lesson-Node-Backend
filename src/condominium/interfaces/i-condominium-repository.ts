import { CondominiumModel } from '../condominium.model'
import { ICondominiumParams } from './icondominium-params'

export interface ICondominiumRepository {
  create(condominium: ICondominiumParams): Promise<CondominiumModel>
  getAll(): Promise<Array<CondominiumModel>>
  getOne(id: string): Promise<CondominiumModel | null>
  update(
    condominiumParams: ICondominiumParams
  ): Promise<CondominiumModel | null>
}
