import { GetAllCondominiumsUseCase } from '../use-cases/get-all-condominiums.use-case'
import { inMemoryCondominiumRepositoryFactory } from './in-memory-condominium-repository.factory'

export const getAllCondominiumUseCaseFactory = () => {
  return new GetAllCondominiumsUseCase(inMemoryCondominiumRepositoryFactory())
}
