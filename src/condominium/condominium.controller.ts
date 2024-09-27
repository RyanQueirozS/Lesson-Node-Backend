import { Request, Response } from 'express'
import { ICondominiumParams } from './interfaces/i-condominium-params'
import { ICreateCondominiumUseCase } from './interfaces/i-create-condominium-use-case'
import { IGetAllCondominiumsUseCase } from './interfaces/i-get-all-condominiums-use-case'
import { IGetOneCondominiumUseCase } from './interfaces/i-get-one-condominium-use-case'
import { IUpdateCondominiumUseCase } from './interfaces/i-update-condominium-use-case'

export class CondominiumController {
  constructor(
    private createCondominiumUseCase: ICreateCondominiumUseCase,
    private getAllCondominiumsUseCase: IGetAllCondominiumsUseCase,
    private getOneCondominiumUseCase: IGetOneCondominiumUseCase,
    private updateCondominiumUseCase: IUpdateCondominiumUseCase
  ) {}

  public async create(req: Request, res: Response): Promise<any> {
    const { body } = req
    const condominium = await this.createCondominiumUseCase.execute(body)
    res.json({ data: condominium!.toDTO() })
  }

  public async getAll(req: Request, res: Response) {
    void req
    res.status(200).json(await this.getAllCondominiumsUseCase.execute())
  }
  public async getOne(req: Request, res: Response) {
    const { id } = req.params
    const resp = await this.getOneCondominiumUseCase.execute(id)
    res.status(200).json(resp)
  }
  public async update(req: Request, res: Response) {
    const { id, cnpj, name, address, logoPath }: ICondominiumParams = req.body

    const updatedCondominium = await this.updateCondominiumUseCase.execute({
      id,
      cnpj,
      name,
      address,
      logoPath
    })

    res.status(200).json(updatedCondominium)
  }
}
