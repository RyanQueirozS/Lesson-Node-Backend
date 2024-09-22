import { condominiumModelFactory } from '../factories/condominium-model.factory'
import { ICondominiumParams } from '../interfaces/icondominium-params'
import { ICondominiumRepository } from '../interfaces/icondominium-repository'
import { ICreateCondominiumUseCase } from '../protocols'

export class CreateCondominiumUseCase implements ICreateCondominiumUseCase {
  constructor(private condominiumRepository: ICondominiumRepository) {}

  async execute(params: ICondominiumParams) {
    console.log(params)
    const condominium = condominiumModelFactory(params)
    return this.condominiumRepository.create(condominium)
  }
}
