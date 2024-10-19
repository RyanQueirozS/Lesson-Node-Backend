import { ErrorHandler } from './ErrorHandler'

export class DatabaseErrorHandler extends ErrorHandler {
  constructor(messageObject: object) {
    super({ code: 500, errors: messageObject })
  }
}
