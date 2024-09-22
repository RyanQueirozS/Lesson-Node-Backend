import { CondominiumModelValidatorService } from '@src/shared/services/validators'
import { CondominiumModel } from './condominium.model'
import { ICondominiumParams } from './interfaces/icondominium-params'
import { ICondominiumRepository } from './interfaces/icondominium-repository'
import { OptionsValidation } from '@src/shared/services/validators/protocols/options.validation'}

export class CondominiumInMemoryRepository implements ICondominiumRepository {
    private condominiums: Map<string, CondominiumModel> = new Map()
    private static instance: CondominiumInMemoryRepository

    public static getInstance(): CondominiumInMemoryRepository {
        if (CondominiumInMemoryRepository.instance == null) {
            CondominiumInMemoryRepository.instance =
                new CondominiumInMemoryRepository()
        }
        return this.instance
    }

    private constructor() { }

    async save(condominiumParams: ICondominiumParams) {
        const condominium = new CondominiumModel(condominiumParams, new CondominiumModelValidatorService(), this, false)
        if (!condominium) return null!;
        this.condominiums.set(condominium.id!, condominium)
        return condominium;
    }

    async getAll(): Promise<Array<CondominiumModel>> {
        let allCondominiums = Array<CondominiumModel>()
        this.condominiums.forEach((condominium: CondominiumModel, _: string) => {
            allCondominiums.push(condominium)
        })
        return allCondominiums
    }
}
