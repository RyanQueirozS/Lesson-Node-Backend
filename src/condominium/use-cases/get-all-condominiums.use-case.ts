import { CondominiumModel } from '../condominium.model'
import { ICondominiumRepository } from '../interfaces/icondominium-repository'

export class GetAllCondominiumsUseCase {
  constructor(private condominiumRepository: ICondominiumRepository) {}

  async execute(): Promise<Array<CondominiumModel>> {
    return await this.condominiumRepository.getAll()
  }
}
