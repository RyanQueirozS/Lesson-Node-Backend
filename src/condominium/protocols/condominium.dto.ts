import { BaseDto } from '@src/shared/models/base.model'

export interface CondominiumDto extends BaseDto {
  cnpj: string
  name: string
  address: string
  logoPath: string
}
