import {
  BadRequestErrorHandler,
  DatabaseErrorHandler,
  EnumBadRequestType,
  NotFoundErrorHandler
} from '../error-handlers'

export function throwInvalidParamError(message: string) {
  throw new BadRequestErrorHandler(message, EnumBadRequestType.Invalid)
}

export function throwMissingParamError(message: string) {
  throw new BadRequestErrorHandler(message, EnumBadRequestType.Missing)
}

export function throwNotFoundError(message: string) {
  throw new NotFoundErrorHandler(message)
}

export function throwDatabaseError(message: string) {
  throw new DatabaseErrorHandler(message)
}
