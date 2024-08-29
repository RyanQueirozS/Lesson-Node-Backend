import { Request, Response, Router } from 'express'
import { CondominiumController } from "./condominium.controller";

export class CondominiumRouter {
    public router: Router;

    constructor(private condominiumController: CondominiumController) {
        this.router = Router();
        this.InitRoutes();
    }

    private InitRoutes() {
        this.router.get('/', (req: Request, res: Response) => {
            void (req);
            res.send('Hello from cond')
        });
        this.router.post('/', (req: Request, res: Response) => {
            this.condominiumController.createCondominium(req, res)
        })
    }
    public getRouter(): Router {
        return this.router;
    }
}
