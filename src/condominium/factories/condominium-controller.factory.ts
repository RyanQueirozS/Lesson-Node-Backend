import { CondominiumController } from '../condominium.controller'
import { createCondominiumUseCaseFactory } from './create-condominium-use-case.factory'
import { getAllCondominiumUseCaseFactory } from './get-all-condominium-use-case.factory'
import { getOneCondominiumUseCaseFactory } from './get-one-condominium-use-case.factory'
import { updateCondominiumUseCaseFactory } from './update-condominium-use-case.factory'

export const condominiumControllerFactory = () => {
  return new CondominiumController(
    createCondominiumUseCaseFactory(),
    getAllCondominiumUseCaseFactory(),
    getOneCondominiumUseCaseFactory(),
    updateCondominiumUseCaseFactory()
  )
}
