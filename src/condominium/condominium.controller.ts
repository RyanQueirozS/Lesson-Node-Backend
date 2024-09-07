import { Request, Response } from 'express';
import { CreateCondominiumUseCase } from './use-cases/createCondominium.use-case';
import { ICondominiumParams, CondominiumModel } from './condominium.model';
import { GetAllCondominiumsUseCase } from './use-cases/getAllCondominiums.UseCase';

export class CondominiumController {
  constructor(
    private createCondominiumUseCase: ICreateCondominiumUseCase,
    private getAllCondominiumsUseCase: GetAllCondominiumsUseCase
  ) {}

  public async create(req: Request, res: Response): Promise<void> {
    const { body } = req;
    const condominium = await this.createCondominiumUseCase.execute(body);
    return res.json({ data: condominium.toDTO() });
  }

  public async getAll(req: Request, res: Response) {
    void req;
    res.status(200).json(await this.getAllCondominiumsUseCase.execute());
  }
}
