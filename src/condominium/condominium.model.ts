import { BaseModel } from '@src/shared/models/base.model'
import { throwInvalidParamError } from '@src/shared/utils/helpers'
import { CondominiumDto } from './protocols/condominium.dto'
import { ICondominiumRepository } from './interfaces/i-condominium-repository'
import { ICondominiumParams } from './interfaces/i-condominium-params'
import { IValidatorService } from '@src/shared/interfaces/i-validator-service'
import { OptionsValidation } from '@src/shared/services/validators/protocols/options.validation'
import { StringFormatter } from '@src/shared/utils/helpers/string-format'

export class CondominiumModel extends BaseModel {
  private _cnpj: string
  private _name: string
  private _address: string
  private _logoPath: string

  constructor(
    props: ICondominiumParams,
    private validatorService: IValidatorService<CondominiumModel>,
    private condominiumRepository: ICondominiumRepository,
    private options: OptionsValidation = { isBeingCreated: true }
  ) {
    super(props, options.isBeingCreated)
    this._cnpj = props.cnpj
    this._name = StringFormatter.modifyString(
      props.name,
      StringFormatter.EFormattingType.ToLower |
        StringFormatter.EFormattingType.RemoveSQL |
        StringFormatter.EFormattingType.RemoveWhitespace
    )
    this._address = props.address
    this._logoPath = props.logoPath

    this.validate()
  }

  get cnpj() {
    return this._cnpj
  }
  get name() {
    return this._name
  }
  get address() {
    return this._address
  }
  get logoPath() {
    return this._logoPath
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
      isActive: this.isActive
    }
  }

  private validate(): void {
    this.validatorService.validate(this, this.options)

    if (this.diagnosticService.hasErrors()) {
      throwInvalidParamError(JSON.stringify(this.diagnosticService.getErrors()))
    }
  }

  validateIfCNPJExist(): boolean {
    return !!this.condominiumRepository.getOne({ cnpj: this.cnpj })
  }
  validateIfNameExist(): boolean {
    return !!this.condominiumRepository.getOne({ name: this.name })
  }

  validateIfExists(): void {
    if (this.validateIfCNPJExist()) {
      this.diagnosticService.addError({
        message: 'already exists',
        field: 'cnpj',
        context: 'condominium'
      })
    }
    if (this.validateIfNameExist()) {
      this.diagnosticService.addError({
        message: 'already exists',
        field: 'name',
        context: 'condominium'
      })
    }
    if (this.diagnosticService.hasErrors()) {
      throwInvalidParamError(JSON.stringify(this.diagnosticService.getErrors()))
    }
  }
}
