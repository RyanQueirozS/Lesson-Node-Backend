import * as yup from 'yup';
import { setLocale } from 'yup';

export abstract class BaseValidatorService {
  constructor() {
    setLocale({
      mixed: {
        required: 'campo obrigatório',
        notType: 'campo inválido',
        oneOf: 'campo inválido',
      },
      string: {
        min: 'campo deve ter no mínimo ${min} caracteres',
        max: 'campo deve ter no máximo ${max} caracteres',
        email: 'campo deve ser um email válido',
      },
      number: {
        min: 'campo deve ser maior ou igual a ${min}',
        max: 'campo deve ser menor ou igual a ${max}',
      },
      date: {
        min: 'data deve ser maior ou igual a ${min}',
        max: 'data deve ser menor ou igual a ${max}',
      },
      array: {
        min: 'campo deve ter no mínimo ${min} itens',
        max: 'campo deve ter no máximo ${max} itens',
      },
    });
  }

  optionalProperties(iscreation: boolean) {
    return !iscreation
      ? {
          id: yup.number().min(1).required(),
          createdAt: yup.date().notRequired().nullable(),
          updatedAt: yup.date().notRequired().nullable(),
        }
      : {};
  }
}
