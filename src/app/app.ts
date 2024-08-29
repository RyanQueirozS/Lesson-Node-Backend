import express, { Express, Router } from 'express'

const port = 8888

export class App {
    private static instance: App | null = null;
    private app: Express;

    private constructor() {
        this.app = express();
        this.init();
    }

    static getInstance(): App {
        if (!App.instance) {
            App.instance = new App();
        }
        return this.instance!;
    }

    run(): void {
        this.app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })
    }

    private init(): void {
        this.app.use(express.json());
    }

    addRoute(route: string, router: Router): void {
        this.app.use(route, router);
    }
}
