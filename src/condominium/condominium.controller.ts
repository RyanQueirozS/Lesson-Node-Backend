import { Request, Response } from 'express'
import { CreateCondominiumUseCase } from './use-cases/createCondominium.use-case';
import { ICondominiumModel, CondominiumModel } from './condominium.model';

export class CondominiumController {
    constructor(private createCondominiumUseCase: CreateCondominiumUseCase) { }

    public async createCondominium(req: Request, res: Response): Promise<void> {
        const { id, cnpj, name, addres, logoPath }: ICondominiumModel = req.body;
        if (!id || !cnpj || !name || !addres || !logoPath) {
            res.status(404).send("Bad JSON");
            return;
        }

        const condominium = new CondominiumModel({ id, cnpj, name, addres, logoPath })
        if (condominium == null) {
            res.status(404).json(condominium);
            return;
        }

        await this.createCondominiumUseCase.execute(condominium);
        res.status(200).json(condominium);
    }
}
