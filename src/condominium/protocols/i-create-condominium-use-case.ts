import { ICondominiumParams } from '../interfaces/icondominium-params';
import { CondominiumModel } from '../condominium.model';


export interface ICreateCondominiumUseCase {
  execute(brand: ICondominiumParams): Promise<CondominiumModel>
}
