import { CondominiumModel } from "./condominium.model";

interface CondominiumRepository {
    save(condominium: CondominiumModel): Promise<void>;
    getByID(id: string): Promise<CondominiumModel | null>;
}

export class CondominiumInMemoryRepository implements CondominiumRepository {
    private condominiums: Map<string, CondominiumModel> = new Map();

    async save(condominium: CondominiumModel): Promise<void> { }

    async getByID(id: string): Promise<CondominiumModel | null> { }
}
