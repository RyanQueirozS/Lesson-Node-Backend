import { ICondominiumRepository } from '../interfaces/i-condominium-repository'
import { ICondominiumRepositoryFilter } from '../interfaces/i-condominium-repository-filter'
import { IDeleteCondominiumUseCase } from '../interfaces/i-delete-condominium.use-case'

export class DeleteCondominiumUseCase implements IDeleteCondominiumUseCase {
  constructor(private condominiumRepository: ICondominiumRepository) {}

  async execute(filter: ICondominiumRepositoryFilter) {
    return this.condominiumRepository.delete(filter)
  }
}
