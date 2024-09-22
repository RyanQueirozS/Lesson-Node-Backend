import { CondominiumRouter } from './condominium.router'
import { condominiumControllerFactory } from './factories/condominium-controller.factory'

const condRouter = new CondominiumRouter(condominiumControllerFactory())

export { condRouter }
