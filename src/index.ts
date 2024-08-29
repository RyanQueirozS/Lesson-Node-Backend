import { App } from "./app/app";
import { CondominiumController } from "./condominium/condominium.controller";
import { CondominiumInMemoryRepository } from "./condominium/condominium.repository";
import { CondominiumRouter } from "./condominium/condominium.router";
import { CreateCondominiumUseCase } from "./condominium/use-cases/createCondominium.use-case";


const condRepository = new CondominiumInMemoryRepository();
const createCondUseCase = new CreateCondominiumUseCase(condRepository);
const condominiumController = new CondominiumController(createCondUseCase);
const condRouter = new CondominiumRouter(condominiumController);

App.getInstance().addRoute('/condominium', condRouter.getRouter());

App.getInstance().run();
