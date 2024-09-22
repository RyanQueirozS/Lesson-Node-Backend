import { OptionsValidation } from '../services/validators/protocols/i-validator-service'

export interface IValidatorService<T> {
  validate(entity: T, options: OptionsValidation): void
}
