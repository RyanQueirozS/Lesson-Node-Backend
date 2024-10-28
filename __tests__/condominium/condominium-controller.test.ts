import { faker } from '@faker-js/faker/.'
import { App } from '@src/app/app'
import { inMemoryCondominiumRepositoryFactory } from '@src/condominium/factories/in-memory-condominium-repository.factory'
import { assert } from 'console'
import request from 'supertest'

interface CondominiumParams {
  name?: string
  address?: string
  cnpj?: string
  logoPath?: string
}

function cnpjRNG(): string {
  const cnpjLen = 14
  const cnpj = Math.floor((Math.random() * 9 + 1) * Math.pow(10, cnpjLen - 1))
  return cnpj.toString()
}

function generateNumberRange(min: number, max: number): number {
  if (min >= max) {
    throw new Error('Min must be less than max')
  }

  // Generate a random number between min (inclusive) and max (exclusive)
  return Math.floor(Math.random() * (max - min)) + min
}

describe('CondominiumController', () => {
  let condominiumParams: CondominiumParams = null!
  const app = App.getInstance().app

  beforeEach(() => {
    condominiumParams = {
      name: faker.company.name.toString(),
      address: faker.location.streetAddress.toString(),
      cnpj: cnpjRNG(),
      logoPath: faker.system.filePath.toString()
    }

    const condominiumRepository = inMemoryCondominiumRepositoryFactory()
    condominiumRepository.deleteAll()
  })

  describe('create', () => {
    it('should throw an error if the name is not provided', async () => {
      delete condominiumParams.name
      const response = await request(app).post('/condominiums').send(condominiumParams)
      expect(response.status).toBe(400)
      expect(response.body.error.condominium.name[0]).toBe('name is required')
    })

    it('should throw an error if the name contains less than 3 chars', async () => {
      condominiumParams.name = faker.string.alpha(2)
      const response = await request(app).post('/condominiums').send(condominiumParams)
      expect(response.status).toBe(400)
      expect(response.body.error.condominium.name[0]).toBe('field must have at least 3 characters')
    })

    it('should throw an error if the name contains more than 30 chars', async () => {
      condominiumParams.name = faker.string.alpha(31)
      const response = await request(app).post('/condominiums').send(condominiumParams)
      expect(response.status).toBe(400)
      expect(response.body.error.condominium.name[0]).toBe('field must have at most 30 characters')
    })
    it('should throw an error if the same CNPJ exists', async () => {
      const newCNPJ = cnpjRNG()
      condominiumParams.cnpj = newCNPJ
      await request(app).post('/condominiums').send(condominiumParams)
      condominiumParams.cnpj = newCNPJ
      const response = await request(app).post('/condominiums').send(condominiumParams)

      expect(response.status).toBe(400)
      expect(response.body.error.condominium.cnpj[0]).toBe('already exists')
    })
  })

  // @TODO delete other models that are related to condominium after condominium has been deleted.

  describe('delete', () => {
    it("should return 0 affected with a 200 status if a filter doesn't find any condominium", async () => {
      condominiumParams.name = faker.string.alpha(generateNumberRange(3, 30))
      const response = await request(app)
        .delete('/condominiums')
        .send({ name: condominiumParams.name })
      expect(response.status).toBe(200)
      expect(response.body.data).toBe(0)
    })
    it("should return 1 affected with a 200 status if a filter doesn't find any condominium", async () => {
      const newName = faker.string.alpha(generateNumberRange(3, 30))
      condominiumParams.name = newName
      await request(app).post('/condominiums').send(condominiumParams)
      const response = await request(app).delete('/condominiums').send({ name: newName })
      expect(response.status).toBe(200)
      expect(response.body.data).toBe(1)
    })

    it('should delete just the one that fits in with the filter', async () => {
      // Name that all of them will have
      const defaultedName = faker.string.alpha(generateNumberRange(3, 30))

      const lastUsedCNPJ = cnpjRNG()
      let randomCNPJ = ''
      {
        randomCNPJ = cnpjRNG()
        assert(randomCNPJ != lastUsedCNPJ)
        condominiumParams.name = defaultedName
        condominiumParams.cnpj = randomCNPJ
        await request(app).post('/condominiums').send(condominiumParams)
      }

      {
        randomCNPJ = cnpjRNG()
        assert(randomCNPJ != lastUsedCNPJ)
        condominiumParams.name = defaultedName
        condominiumParams.cnpj = randomCNPJ
        await request(app).post('/condominiums').send(condominiumParams)
      }

      {
        condominiumParams.name = defaultedName
        condominiumParams.cnpj = lastUsedCNPJ
        await request(app).post('/condominiums').send(condominiumParams)
      }

      const response = await request(app)
        .delete('/condominiums')
        .send({ name: defaultedName, cnpj: lastUsedCNPJ })
      expect(response.status).toBe(200)
      expect(response.body.data).toBe(1)
    })
  })
})
