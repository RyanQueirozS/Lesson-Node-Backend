import { NextFunction, Request, Response, Router } from 'express'
import { CondominiumController } from './condominium.controller'

export class CondominiumRouter {
  public router: Router

  constructor(private condominiumController: CondominiumController) {
    this.router = Router()
    this.InitRoutes()
  }

  private InitRoutes() {
    this.router.post('/', (req: Request, res: Response, next: NextFunction) => {
      this.condominiumController.create(req, res).catch((err) => next(err))
    })

    this.router.get('/', (req: Request, res: Response, next: NextFunction) => {
      this.condominiumController.getAll(req, res).catch((err) => next(err))
    })
    this.router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
      this.condominiumController.getOne(req, res).catch((err) => next(err))
    })

    this.router.put('/', (req: Request, res: Response, next: NextFunction) => {
      this.condominiumController.update(req, res).catch((err) => next(err))
    })
  }

  public getRouter(): Router {
    return this.router
  }
}
