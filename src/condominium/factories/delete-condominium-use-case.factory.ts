import { DeleteCondominiumUseCase } from '../use-cases/delete-condominium.use-case'
import { inMemoryCondominiumRepositoryFactory } from './in-memory-condominium-repository.factory'

export const deleteCondominiumUseCaseFactory = () => {
  return new DeleteCondominiumUseCase(inMemoryCondominiumRepositoryFactory())
}
