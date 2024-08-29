import { CondominiumModel } from "./condominium.model";

export interface CondominiumRepository {
    save(condominium: CondominiumModel): Promise<void>;
}

export class CondominiumInMemoryRepository implements CondominiumRepository {
    private condominiums: Map<string, CondominiumModel> = new Map();

    async save(condominium: CondominiumModel): Promise<void> {
        if (condominium == null) console.log('oi')
        this.condominiums.set(condominium.getID, condominium);
    }
}
