import { ErrorHandler } from './ErrorHandler'

export class BadRequestErrorHandler extends ErrorHandler {
  constructor(messageObject: object) {
    super({ code: 400, errors:messageObject })
  }
}
