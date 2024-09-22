import { UpdateCondominiumUseCase } from '../use-cases/update-condominium.use-case'
import { inMemoryCondominiumRepositoryFactory } from './in-memory-condominium-repository.factory'

export const updateCondominiumUseCaseFactory = () => {
  return new UpdateCondominiumUseCase(inMemoryCondominiumRepositoryFactory())
}
