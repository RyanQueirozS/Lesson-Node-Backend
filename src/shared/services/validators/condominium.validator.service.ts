import * as yup from 'yup';
import { BaseValidatorService } from './base.validator.service';
import { IValidatorService, OptionsValidation } from './protocols/i-validator-service';
import { CondominiumModel } from '@src/condominium/condominium.model';

export class CondominiumValidatorService
  extends BaseValidatorService
  implements IValidatorService<CondominiumModel>
{
  validate(condominium: CondominiumModel, options: OptionsValidation): void {
    try {
      const schema = yup.object().shape({
        ...this.optionalProperties(options.isCreation),
        name: yup.string().min(3).max(30).required('nome e obrigatório'),
        cnjp: yup.string().min(14).max(14).required('cnpj e obrigatório'),
        address: yup.string().min(3).max(30).required('endereço e obrigatório'),
        logoPath: yup.string().min(3).max(30).nullable().notRequired(),
      });

      schema.validateSync(condominium, { abortEarly: false });
    } catch (errors) {
      const e = errors as yup.ValidationError;
      e.errors.forEach((error) => {
        condominium.notification.addError({
          message: error,
          context: 'condominium',
        });
      });
    }
  }
}
