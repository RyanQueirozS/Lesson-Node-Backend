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
      const response = await request(app)
        .post('/condominiums')
        .send(condominiumParams)
      expect(response.status).toBe(400)
      expect(JSON.stringify(response.body)).toContain('name is required')
    })
  })
})
