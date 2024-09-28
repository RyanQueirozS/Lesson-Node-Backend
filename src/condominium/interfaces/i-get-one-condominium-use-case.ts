import { CondominiumModel } from '../condominium.model'
import { ICondominiumRepositoryFilter } from './i-condominium-repository-filter'

export interface IGetOneCondominiumUseCase {
  execute(filter: ICondominiumRepositoryFilter): Promise<CondominiumModel | null>
}
