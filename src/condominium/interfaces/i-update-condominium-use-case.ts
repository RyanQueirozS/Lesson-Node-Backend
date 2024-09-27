import { CondominiumModel } from '../condominium.model'
import { ICondominiumParams } from './i-condominium-params'

export interface IUpdateCondominiumUseCase {
  execute(
    condominiumProps: ICondominiumParams
  ): Promise<CondominiumModel | null>
}
