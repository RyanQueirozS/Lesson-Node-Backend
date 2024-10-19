import { Response } from 'express'

export interface IErrorObject {
  code: number // 400, 401, 403, 404, 500
  errors: object
}

export abstract class ErrorHandler {
  constructor(protected errorObject: IErrorObject) {}

  public messageToClient(res: Response): Response {
    this.showOnConsole()
    return res
      .status(this.errorObject.code)
      .json({ code: this.errorObject.code, error: this.errorObject.errors })
  }

  public showOnConsole() {
    console.error(new Date().toLocaleString() + ': ' + JSON.stringify(this.errorObject.errors))
  }
}
