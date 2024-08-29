import { CondominiumModel } from '../condominium.model';
import { CondominiumRepository } from '../condominium.repository';

export class CreateCondominiumUseCase {
    constructor(private condominiumRepository: CondominiumRepository) { }

    async execute(condominium: CondominiumModel): Promise<void> {
        this.condominiumRepository.save(condominium);
    }
}
