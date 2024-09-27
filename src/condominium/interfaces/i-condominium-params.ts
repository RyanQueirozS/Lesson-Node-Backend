import { IBaseModelParameters } from '@src/shared/models/base.model'

export interface ICondominiumParams extends IBaseModelParameters {
  cnpj: string
  name: string
  address: string
  logoPath: string
}
