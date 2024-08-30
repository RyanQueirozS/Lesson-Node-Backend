import { CondominiumModel } from "./condominium.model";

export interface CondominiumRepository {
    save(condominium: CondominiumModel): Promise<void>;
    getAll(): Promise<Array<CondominiumModel>>;
}

export class CondominiumInMemoryRepository implements CondominiumRepository {
    private condominiums: Map<string, CondominiumModel> = new Map();

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
