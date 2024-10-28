import { ICondominiumRepositoryFilter } from './i-condominium-repository-filter'

export interface IDeleteCondominiumUseCase {
  execute(filter: ICondominiumRepositoryFilter): Promise<number>
}
