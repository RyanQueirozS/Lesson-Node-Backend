import { CondominiumModel } from '../condominium.model'
import { ICondominiumRepositoryFilter } from './i-condominium-repository-filter'

export interface IGetAllCondominiumsUseCase {
  execute(filter: ICondominiumRepositoryFilter): Promise<Array<CondominiumModel>>
}
