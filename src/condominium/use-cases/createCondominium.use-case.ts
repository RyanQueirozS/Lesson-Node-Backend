import { CondominiumModel, ICondominiumModel } from '../condominium.model';
import { ICondominiumRepository } from '../condominium.repository';

export class CreateCondominiumUseCase {
  constructor(private condominiumRepository: ICondominiumRepository) {}

  async execute(condominiumParams: ICondominiumModel): Promise<void> {
    try {
      const condominium =
      return this.condominiumRepository.save(condominium);
    } catch (error) {
      throw new Error('erro ao criar condominio');
    }
  }
}
