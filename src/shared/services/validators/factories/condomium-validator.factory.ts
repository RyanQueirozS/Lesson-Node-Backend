import { CondominiumModelValidatorService } from '../condominium.validator.service';

export const condomiumValidatorFactory = (): CondominiumModelValidatorService => {
    return new CondominiumModelValidatorService();
};
