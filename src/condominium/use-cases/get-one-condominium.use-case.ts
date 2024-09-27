import { CondominiumModel } from '../condominium.model'
import { ICondominiumRepository } from '../interfaces/i-condominium-repository'
import { IGetOneCondominiumUseCase } from '../interfaces/i-get-one-condominium-use-case'

export class GetOneCondominiumUseCase implements IGetOneCondominiumUseCase {
  constructor(private condominiumRepository: ICondominiumRepository) {}

  async execute(id: string) {
    return this.condominiumRepository.getOne(id)
  }
}
