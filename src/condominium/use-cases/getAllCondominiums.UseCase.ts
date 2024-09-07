import { CondominiumModel } from "../condominium.model";
import { ICondominiumRepository } from "../condominium.repository";

export class GetAllCondominiumsUseCase {
    constructor(private condominiumRepository: ICondominiumRepository) { }

    async execute(): Promise<Array<CondominiumModel>> {
        return this.condominiumRepository.getAll();
    }
}
