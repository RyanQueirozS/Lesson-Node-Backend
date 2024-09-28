import { CondominiumModel } from '../condominium.model'
import { IGetAllCondominiumsUseCase } from '../interfaces/i-get-all-condominiums-use-case'
import { ICondominiumRepository } from '../interfaces/i-condominium-repository'
import { ICondominiumRepositoryFilter } from '../interfaces/i-condominium-repository-filter'

export class GetAllCondominiumsUseCase implements IGetAllCondominiumsUseCase {
  constructor(private condominiumRepository: ICondominiumRepository) {}

  async execute(filter: ICondominiumRepositoryFilter): Promise<Array<CondominiumModel>> {
    return await this.condominiumRepository.getAll(filter)
  }
}
