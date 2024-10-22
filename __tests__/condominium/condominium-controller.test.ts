import { App } from '@src/app/app'
import request from 'supertest'

interface CondominiumParams {
  name?: string
  address?: string
  cnpj?: string
  logoPath?: string
}

describe('CondominiumController', () => {
  let condominiumParams: CondominiumParams = null!
  const app = App.getInstance().app

  beforeEach(() => {
    condominiumParams = {
      name: 'Condominium Test',
      address: '1234 Street',
      cnpj: '12345678901234',
      logoPath: 'logo.png'
    }
  })

  describe('create', () => {
    it('should throw an error if the name is not provided', async () => {
      delete condominiumParams.name
      const response = await request(app).post('/condominiums').send(condominiumParams)
      expect(response.status).toBe(400)
      expect(response.body.error.condominium.name[0]).toBe('name is required')
    })

    it('should throw an error if the name contains less than 3 chars', async () => {
      condominiumParams.name = '12'
      const response = await request(app).post('/condominiums').send(condominiumParams)
      expect(response.status).toBe(400)
      expect(response.body.error.condominium.name[0]).toBe('field must have at least 3 characters')
    })

    it('should throw an error if the name contains more than 30 chars', async () => {
      condominiumParams.name = '1234567890123456789012345678901'
      const response = await request(app).post('/condominiums').send(condominiumParams)
      expect(response.status).toBe(400)
      expect(response.body.error.condominium.name[0]).toBe('field must have at most 30 characters')
    })
    it('should throw an error if the same name exists', async () => {
      condominiumParams.name = 'valid Name'
      await request(app).post('/condominiums').send(condominiumParams)
      condominiumParams.name = ' valid      name  ' // note how the space or the capitalized letters don't matter
      const response = await request(app).post('/condominiums').send(condominiumParams)

      expect(response.status).toBe(400)
      expect(response.body.error.condominium.name[0]).toBe('already exists')
    })
  })
})
