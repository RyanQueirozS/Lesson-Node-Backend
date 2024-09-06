import { CondominiumModel } from "../condominium.model";
import { ICondominiumRepository } from "../interfaces/icondominium-repository";

export class GetOneCondominiumUseCase {
    constructor(private condominiumRepository: ICondominiumRepository) {}

    async execute(id: string): Promise<CondominiumModel | null> {
        return await this.condominiumRepository.getOne(id);
    }
}
