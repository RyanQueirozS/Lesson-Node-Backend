import { CondominiumModel } from "./condominium.model";
import { ICondominiumRepository } from "./interfaces/icondominium-repository";

export class CondominiumInMemoryRepository implements ICondominiumRepository {
    private condominiums: Map<string, CondominiumModel> = new Map();
    private static instance: CondominiumInMemoryRepository;

    public static getInstance(): CondominiumInMemoryRepository {
        if (CondominiumInMemoryRepository.instance == null) {
            CondominiumInMemoryRepository.instance = new CondominiumInMemoryRepository();
        }
        return this.instance;
    }

    private constructor() { }

    async save(condominium: CondominiumModel): Promise<void> {
        if (condominium != null) this.condominiums.set(condominium.getID, condominium);
    }

    async getAll(): Promise<Array<CondominiumModel>> {
        let allCondominiums = Array<CondominiumModel>();
        this.condominiums.forEach((condominium: CondominiumModel, _: string) => {
            allCondominiums.push(condominium);
        })
        return allCondominiums;
    }
}
