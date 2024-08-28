import { Request, Response } from 'express'
import { CondominiumUseCase } from './use-cases/condominium.use-case';

export class CondominiumController {
    constructor(private condominiumUseCase: CondominiumUseCase) { }

    public async execute(req: Request, res: Response): Promise<void> {
        await this.condominiumUseCase.execute();
    }
}
