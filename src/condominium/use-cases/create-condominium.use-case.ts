import { condominiumModelFactory } from '../factories/condominium-model.factory'
import { ICondominiumParams } from '../interfaces/i-condominium-params'
import { ICondominiumRepository } from '../interfaces/i-condominium-repository'
import { ICreateCondominiumUseCase } from '../interfaces/i-create-condominium-use-case'

export class CreateCondominiumUseCase implements ICreateCondominiumUseCase {
  constructor(private condominiumRepository: ICondominiumRepository) {}

  async execute(params: ICondominiumParams) {
    const condominium = condominiumModelFactory(params)
    condominium.validateIfExists()

    return this.condominiumRepository.create(condominium)
  }
}
