import { randomUUID, UUID } from 'crypto'
import { NotificationService } from '../services'

export interface BaseDto {
  id: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface IBaseModelParameters {
  id?: string
  isActive?: boolean
  isDeleted?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export abstract class BaseModel {
  protected _id: string
  protected _createdAt: Date
  protected _updatedAt: Date
  protected _isActive: boolean
  protected _isDeleted: boolean
  public notification: NotificationService

  constructor(entityParameters: IBaseModelParameters, isCreation: boolean) {
    this._id = isCreation ? randomUUID() : entityParameters.id!
    this._createdAt = entityParameters.createdAt!
    this._updatedAt = entityParameters.updatedAt!
    this._isActive = entityParameters.isActive!
    this._isDeleted = entityParameters.isDeleted!
    this.notification = new NotificationService()
  }

  get id() {
    return this._id
  }

  get createdAt() {
    return this._createdAt
  }

  get updatedAt() {
    return this._updatedAt
  }

  get isActive() {
    return this._isActive
  }

  get isDeleted() {
    return this._isDeleted
  }
}
