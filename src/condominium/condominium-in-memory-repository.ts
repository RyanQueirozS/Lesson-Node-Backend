import { CondominiumModel } from "./condominium.model";
import { ICondominiumParams } from "./interfaces/icondominium-params";
import { ICondominiumRepository } from "./interfaces/icondominium-repository";

export class CondominiumInMemoryRepository implements ICondominiumRepository {
    private condominiums: Map<string, CondominiumModel> = new Map();
    private static instance: CondominiumInMemoryRepository;
    private constructor() { }

    public static getInstance(): CondominiumInMemoryRepository {
        if (!CondominiumInMemoryRepository.instance) {
            CondominiumInMemoryRepository.instance =
                new CondominiumInMemoryRepository();
        }
        return this.instance;
    }

    async save(
        condominiumParams: ICondominiumParams,
    ): Promise<CondominiumModel> {
        let newID = 0;
        // TODO generate more unique ids
        // it's now generating the highest found id + 1
        {
            let highestID = 0;
            this.condominiums.forEach((_: CondominiumModel, condID: string) => {
                if (highestID <= Number(condID)) highestID = Number(condID) + 1;
            });
            newID = highestID;
        }

        condominiumParams.id = newID.toString();
        let newCondominium = new CondominiumModel(condominiumParams);
        if (condominiumParams != null) {
            this.condominiums.set(newID.toString(), newCondominium);
            return newCondominium;
        }

        return null;
    }

    async getAll(): Promise<Array<CondominiumModel>> {
        let allCondominiums = Array<CondominiumModel>();
        this.condominiums.forEach(
            (condominium: CondominiumModel, _: string) => {
                allCondominiums.push(condominium);
            },
        );
        return allCondominiums;
    }

    async getOne(id: string) {
        let condominium: CondominiumModel = null;
        // TODO redo with a break statement and/or more readable loop/builtin find function
        this.condominiums.forEach(
            (cond: CondominiumModel, condID: string) => {
                if (id == condID) {
                    condominium = cond;
                }
            },
        );

        return condominium;
    }

    async update(condominiumParams: ICondominiumParams) {
        if (!this.condominiums.has(condominiumParams.id)) return null;

        const newCond = new CondominiumModel(condominiumParams);
        this.condominiums.set(condominiumParams.id, newCond)
        return newCond;
    }

    async delete(id: string): Promise<CondominiumModel | null> {
        const cond = this.condominiums.get(id);
        if (cond) {
            this.condominiums.delete(id);
            return cond;
        }
        return null;
    }
}
