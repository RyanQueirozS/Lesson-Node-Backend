import { CondominiumModel } from '../condominium.model'

export interface IGetOneCondominiumUseCase {
  execute(id: string): Promise<CondominiumModel | null>
}
