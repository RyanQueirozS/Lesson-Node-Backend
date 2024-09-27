import { CondominiumModel } from '../condominium.model'
import { ICondominiumParams } from '../interfaces/i-condominium-params'
import { ICondominiumRepository } from '../interfaces/i-condominium-repository'
import { IUpdateCondominiumUseCase } from '../interfaces/i-update-condominium-use-case'

export class UpdateCondominiumUseCase implements IUpdateCondominiumUseCase {
  constructor(private condominiumRepository: ICondominiumRepository) {}

  async execute(condominiumProps: ICondominiumParams) {
    return await this.condominiumRepository.update(condominiumProps)
  }
}
