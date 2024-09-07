import { GetOneCondominiumUseCase } from "../use-cases/get-one-condominium.use-case"
import { inMemoryCondominiumRepositoryFactory } from "./in-memory-condominium-repository.factory"

export const getOneCondominiumUseCaseFactory = () => {
    return new GetOneCondominiumUseCase(inMemoryCondominiumRepositoryFactory());
}
