import {
  BadRequestErrorHandler,
  DatabaseErrorHandler,
  NotFoundErrorHandler
} from '../error-handlers'

export function throwInvalidParamError(message: object) {
  throw new BadRequestErrorHandler(message)
}

export function throwMissingParamError(message: object) {
  throw new BadRequestErrorHandler(message)
}

export function throwNotFoundError(message: object) {
  throw new NotFoundErrorHandler(message)
}

export function throwDatabaseError(message: object) {
  throw new DatabaseErrorHandler(message)
}
