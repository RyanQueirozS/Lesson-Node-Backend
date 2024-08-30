import { Request, Response } from 'express'
import { CreateCondominiumUseCase } from './use-cases/createCondominium.use-case';
import { ICondominiumModel, CondominiumModel } from './condominium.model';
import { GetAllCondominiumsUseCase } from './use-cases/getAllCondominiums.UseCase';

export class CondominiumController {
    constructor(
        private createCondominiumUseCase: CreateCondominiumUseCase,
        private getAllCondominiumsUseCase: GetAllCondominiumsUseCase
    ) { }

    public async create(req: Request, res: Response): Promise<void> {
        const { id, cnpj, name, address, logoPath }: ICondominiumModel = req.body;
        if (!id || !cnpj || !name || !address || !logoPath) {
            res.status(404).send("Bad JSON");
            return;
        }

        const condominium = new CondominiumModel({ id, cnpj, name, address, logoPath })
        if (condominium == null) {
            res.status(404).json(condominium);
            return;
        }

        await this.createCondominiumUseCase.execute(condominium);
        res.status(200).json(condominium);
    }

    public async getAll(req: Request, res: Response) {
        void (req);
        res.status(200).json(
            await this.getAllCondominiumsUseCase.execute()
        );
    }
}
