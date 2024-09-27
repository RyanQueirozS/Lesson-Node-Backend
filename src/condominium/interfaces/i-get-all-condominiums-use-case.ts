import { CondominiumModel } from '../condominium.model'

export interface IGetAllCondominiumsUseCase {
  execute(): Promise<Array<CondominiumModel>>
}
