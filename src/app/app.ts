import express, { Express, Request, Response } from 'express'

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

    init(): void {
        this.app.get('/', (req: Request, res: Response) => {
            void (req);
            res.send('Hello from root')
        })
    }
}
