import { Request, Response } from "express";
import { CreateCondominiumUseCase } from "./use-cases/create-condominium.use-case";
import { GetAllCondominiumsUseCase } from "./use-cases/get-all-condominiums.use-case";
import { ICondominiumParams } from "./interfaces/icondominium-params";
import { GetOneCondominiumUseCase } from "./use-cases/get-one-condominium.use-case";
import { UpdateCondominiumUseCase } from "./use-cases/update-condominium.use-case";

export class CondominiumController {
    constructor(
        private createCondominiumUseCase: CreateCondominiumUseCase,
        private getAllCondominiumsUseCase: GetAllCondominiumsUseCase,
        private getOneCondominiumUseCase: GetOneCondominiumUseCase,
        private updateCondominiumUseCase: UpdateCondominiumUseCase,
    ) { }

    public async create(req: Request, res: Response): Promise<void> {
        const { cnpj, name, address, logoPath }: ICondominiumParams = req.body;

        const createdCondominium = await this.createCondominiumUseCase.execute({
            cnpj,
            name,
            address,
            logoPath,
        });

        res.status(200).json(createdCondominium);
    }

    public async getAll(req: Request, res: Response) {
        res.status(200).json(
            await this.getAllCondominiumsUseCase.execute()
        );
    }

    public async getOne(req: Request, res: Response) {
        const { id } = req.params;
        const resp = await this.getOneCondominiumUseCase.execute(id)
        res.status(200).json(
            resp
        );
    }

    public async update(req: Request, res: Response) {
        const { id, cnpj, name, address, logoPath }: ICondominiumParams = req.body;

        const updatedCondominium = await this.updateCondominiumUseCase.execute({
            id,
            cnpj,
            name,
            address,
            logoPath,
        })

        res.status(200).json(
            updatedCondominium
        )
    }
}
