import { CreateCondominiumUseCase } from '../use-cases/create-condominium.use-case'
import { inMemoryCondominiumRepositoryFactory } from './in-memory-condominium-repository.factory'

export const createCondominiumUseCaseFactory = () => {
  return new CreateCondominiumUseCase(inMemoryCondominiumRepositoryFactory())
}
