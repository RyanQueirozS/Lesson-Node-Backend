import { BaseModel, IBaseModelParameters } from '@src/shared/models/base.model';
import {
  IValidatorService,
  OptionsValidation,
} from '@src/shared/services/validators/protocols/i-validator-service';
import { ICondominiumRepository } from './condominium.repository';
import { throwInvalidParamError } from '@src/shared/utils/helpers';
import { CondominiumDto } from './protocols/condominium.dto';

export interface ICondominiumParams extends IBaseModelParameters {
  cnpj: string;
  name: string;
  address: string;
  logoPath: string;
}

export class CondominiumModel extends BaseModel {
  private _cnpj: string;
  private _name: string;
  private _address: string;
  private _logoPath: string;

  constructor(
    props: ICondominiumParams,
    private validatorService: IValidatorService<CondominiumModel>,
    private condominiumRepository: ICondominiumRepository,
    private options: OptionsValidation = { isCreation: true }
  ) {
    super(props, options.isCreation);
    this._cnpj = props.cnpj;
    this._name = props.name;
    this._address = props.address;
    this._logoPath = props.logoPath;

    this.validate();
  }

  get cnpj() {
    return this._cnpj;
  }
  get name() {
    return this._name;
  }
  get address() {
    return this._address;
  }
  get logoPath() {
    return this._logoPath;
  }

  toDTO(): CondominiumDto {
    return {
      id: this.id,
      name: this.name,
      address: this.address,
      cnpj: this.cnpj,
      logoPath: this.logoPath,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      isActive: this.isActive,
    };
  }

  private validate(): void {
    this.validatorService.validate(this, this.options);

    if (this.notification.hasErrors()) {
      throwInvalidParamError(this.notification.getErrors());
    }
  }

  checkIFCnpjExists(): void {
    const condominium = this.condominiumRepository.getOne({ cnpj: this.cnpj });

    if (condominium) {
      this.notification.addError({
        message: 'CNPJ already exists',
        context: 'condominium',
      });
    }
  }
}
