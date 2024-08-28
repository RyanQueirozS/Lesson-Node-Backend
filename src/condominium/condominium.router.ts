import { Router } from 'express'
import { CondominiumController } from "./condominium.controller";

class CondominiumRouter {
    public router: Router;

    constructor(private condominiumController: CondominiumController) {
        this.router = Router();
        this.InitRoutes();
    }

    private InitRoutes() {
        // define route to "create/delete/..." using condController methods
        // eg:
        this.router.post('/path', (req, res) => this.condominiumController.execute(req, res));
    }
}
