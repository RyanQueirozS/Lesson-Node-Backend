import { CondominiumModel } from '../condominium.model'
import { ICondominiumParams } from './i-condominium-params'

export interface ICreateCondominiumUseCase {
  execute(brand: ICondominiumParams): Promise<CondominiumModel>
}
