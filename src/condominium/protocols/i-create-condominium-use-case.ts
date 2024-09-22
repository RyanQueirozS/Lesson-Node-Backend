import { ICondominiumParameters, CondomiminumModel } from '..'

export interface ICreateBrandUseCase {
  execute(brand: ICondominiumParameters): Promise<CondomiminumModel>
}
