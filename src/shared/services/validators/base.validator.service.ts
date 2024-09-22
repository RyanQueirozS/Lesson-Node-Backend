import * as yup from 'yup'
import { setLocale } from 'yup'

export abstract class BaseValidatorService {
  constructor() {
    setLocale({
      mixed: {
        required: 'field is required',
        notType: 'invalid field',
        oneOf: 'invalid field'
      },
      string: {
        min: 'field must have at least ${min} characters',
        max: 'field must have at most ${max} characters',
        email: 'field must be a valid email'
      },
      number: {
        min: 'field must be greater than or equal to ${min}',
        max: 'field must be less than or equal to ${max}'
      },
      date: {
        min: 'date must be greater than or equal to ${min}',
        max: 'date must be less than or equal to ${max}'
      },
      array: {
        min: 'field must have at least ${min} items',
        max: 'field must have at most ${max} items'
      }
    })
  }

  optionalProperties(isBeingCreated: boolean): yup.ObjectShape {
    return !isBeingCreated
      ? {
          id: yup.number().min(1).required(),
          createdAt: yup.date().notRequired().nullable(),
          updatedAt: yup.date().notRequired().nullable()
        }
      : {}
  }
}
