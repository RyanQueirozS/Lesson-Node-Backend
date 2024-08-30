import { CondominiumController } from "./condominium.controller";
import { CondominiumInMemoryRepository } from "./condominium.repository";
import { CondominiumRouter } from "./condominium.router";
import { CreateCondominiumUseCase } from "./use-cases/createCondominium.use-case";
import { GetAllCondominiumsUseCase } from "./use-cases/getAllCondominiums.UseCase";

const condRepository = new CondominiumInMemoryRepository();

const createCondUseCase = new CreateCondominiumUseCase(condRepository);
const getAllCondUseCase = new GetAllCondominiumsUseCase(condRepository);

const condominiumController = new CondominiumController(createCondUseCase, getAllCondUseCase);

const condRouter = new CondominiumRouter(condominiumController);

export { condRouter }
