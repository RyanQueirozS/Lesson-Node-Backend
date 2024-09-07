import { CondominiumInMemoryRepository } from "../condominium-in-memory-repository";

export const inMemoryCondominiumRepositoryFactory = () => {
    return CondominiumInMemoryRepository.getInstance();
}
