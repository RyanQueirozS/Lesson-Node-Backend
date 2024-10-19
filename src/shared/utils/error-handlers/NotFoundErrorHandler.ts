import { ErrorHandler } from './ErrorHandler'

export class NotFoundErrorHandler extends ErrorHandler {
  constructor(messageObject: object) {
    super({ code: 404, errors: messageObject })
  }
}
