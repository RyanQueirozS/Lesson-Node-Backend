import { condomiumValidatorFactory } from '@src/shared/services/validators/factories'
import { CondominiumModel } from '../condominium.model'
import { ICondominiumParams } from '../interfaces/icondominium-params'
import { inMemoryCondominiumRepositoryFactory } from './in-memory-condominium-repository.factory'

export const condominiumModelFactory = (props:  ICondominiumParams): CondominiumModel => {
    return new CondominiumModel(props,condomiumValidatorFactory(), inMemoryCondominiumRepositoryFactory() )
}
