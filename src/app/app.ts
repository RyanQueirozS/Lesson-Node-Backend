import { condRouter } from '@src/condominium'
import express, { Express } from 'express'
import {errorHandler} from './error-handler'

const port = 8888

export class App {
  private static instance: App | null = null
  public app: Express

  private constructor() {
    this.app = express()
    this.init()
  }

  static getInstance(): App {
    if (!App.instance) {
      App.instance = new App()
    }
    return this.instance!
  }

  run(): void {
    this.app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
  }

  private init(): void {
    this.app.use(express.json())
    this.routes()
  }

  routes() {
    this.app.use('/condominiums', condRouter.getRouter())
    this.app.use(errorHandler)
  }
}
