export type NotificationErrorProperties = {
  message: string
  field?: string
  context: string
}

export class NotificationService {
  private errors: NotificationErrorProperties[]

  constructor() {
    this.errors = []
  }

  addError(error: NotificationErrorProperties) {
    this.errors.push(error)
  }

  getErrors(context?: string) {
    const message: any = {}
    this.errors.forEach((error: NotificationErrorProperties) => {
      if (error.context === context || !context) {
        if (!message.hasOwnProperty(error.context)) {
          message[error.context] = {}
        }

        if (message[error.context].hasOwnProperty(error.field)) {
          message[error.context][error.field!].push(error.message)
        }

        if (!message[error.context].hasOwnProperty(error.field)) {
          message[error.context][error.field!] = [error.message]
        }
      }
    })

    return JSON.stringify(message)
  }

  hasErrors() {
    return !!this.errors.length
  }
}
