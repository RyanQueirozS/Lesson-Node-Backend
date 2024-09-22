import { CondominiumModel } from '../condominium.model'
import { ICondominiumParams } from '../interfaces/icondominium-params'
import { ICondominiumRepository } from '../interfaces/icondominium-repository'

export class UpdateCondominiumUseCase {
  constructor(private condominiumRepository: ICondominiumRepository) {}

  async execute(
    condominiumProps: ICondominiumParams
  ): Promise<CondominiumModel | null> {
    return await this.condominiumRepository.update(condominiumProps)
  }
}
