export type OptionsValidation = {
    isCreation: boolean;
  };

  export interface IValidatorService<T> {
    validate(entity: T, options: OptionsValidation): void;
  }
