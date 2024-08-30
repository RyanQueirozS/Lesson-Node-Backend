import { CondominiumModel } from "../condominium.model";
import { CondominiumRepository } from "../condominium.repository";

export class GetAllCondominiumsUseCase {
    constructor(private condominiumRepository: CondominiumRepository) { }

    async execute(): Promise<Array<CondominiumModel>> {
        return this.condominiumRepository.getAll();
    }
}
