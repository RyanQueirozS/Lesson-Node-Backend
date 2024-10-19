export type DiagnosticErrorProperties = {
  message: string
  field?: string
  context: string
}

export class DiagnosticService {
  private errors: DiagnosticErrorProperties[]

  constructor() {
    this.errors = []
  }

  addError(error: DiagnosticErrorProperties) {
    this.errors.push(error)
  }

  getErrors(context?: string) {
    const message: Record<string, Record<string, string[]>> = {}
    this.errors.forEach((error: DiagnosticErrorProperties) => {
      if (error.context === context || !context) {
        if (!message.hasOwnProperty(error.context)) {
          message[error.context] = {}
        }

        if (message[error.context].hasOwnProperty(error.field!)) {
          message[error.context][error.field!].push(error.message)
        } else {
          message[error.context][error.field!] = [error.message]
        }
      }
    })

    return message
  }

  hasErrors() {
    return !!this.errors.length
  }
}
