import { CondominiumModel } from '../condominium.model'
import { ICondominiumRepository } from '../interfaces/i-condominium-repository'
import { ICondominiumRepositoryFilter } from '../interfaces/i-condominium-repository-filter'
import { IGetOneCondominiumUseCase } from '../interfaces/i-get-one-condominium-use-case'

export class GetOneCondominiumUseCase implements IGetOneCondominiumUseCase {
  constructor(private condominiumRepository: ICondominiumRepository) {}

  async execute(filter: ICondominiumRepositoryFilter) {
    return this.condominiumRepository.getOne(filter)
  }
}
