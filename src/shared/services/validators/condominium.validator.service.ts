import * as yup from 'yup'
import { BaseValidatorService } from './base.validator.service'
import { CondominiumModel } from '@src/condominium/condominium.model'
import { IValidatorService } from '@src/shared/interfaces/i-validator-service'
import { OptionsValidation } from './protocols/options.validation'

// TODO check if needs a factory
export class CondominiumModelValidatorService
  extends BaseValidatorService
  implements IValidatorService<CondominiumModel>
{
  validate(condominium: CondominiumModel, options: OptionsValidation): void {
    try {
      const schema = yup.object().shape({
        name: yup.string().min(3).max(30).required('name is required'),
        cnpj: yup.string().min(14).max(14).required('cnpj is required'),
        address: yup.string().min(3).max(30).required('address is required'),
        logoPath: yup.string().min(3).max(30).nullable().notRequired(),
        ...this.optionalProperties(options.isBeingCreated)
      })

      schema.validateSync(condominium, { abortEarly: false })
    } catch (errors) {
      const e = errors as yup.ValidationError
      e.inner.forEach((error) => {
        condominium.notification.addError({
          message: error.message,
          context: 'condominium',
          field: error.path
        })
      })
    }
  }
}
