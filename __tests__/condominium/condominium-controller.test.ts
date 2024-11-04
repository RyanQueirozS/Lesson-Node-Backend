// @TODO teste integracao condominium

import { faker } from '@faker-js/faker/.'
import { App } from '@src/app/app'
import { inMemoryCondominiumRepositoryFactory } from '@src/condominium/factories/in-memory-condominium-repository.factory'
import { ICondominiumRepositoryFilter } from '@src/condominium/interfaces/i-condominium-repository-filter'
import { randomNumberGenerator } from '@tests/shared/utils/RNG/randomNumberGenerator'
import { assert } from 'console'
import request, { Response } from 'supertest'

interface CondominiumParams {
  name?: string
  address?: string
  cnpj?: string
  logoPath?: string
}

function validNameGen() {
  return faker.company.name().slice(0, 30)
}
function validAddressGen() {
  return faker.location.streetAddress().slice(0, 30)
}
function validCnpjGen() {
  return faker.number.int().toString().slice(0, 14)
}
function validLogoPathGen() {
  return faker.system.filePath().slice(0, 30)
}

describe('CondominiumController', () => {
  let condominiumParams: CondominiumParams = null!
  const app = App.getInstance().app

  async function createCondominium(condominiumParams: CondominiumParams): Promise<Response> {
    return request(app).post('/condominiums').send(condominiumParams)
  }

  async function deleteCondominium(filter: ICondominiumRepositoryFilter): Promise<Response> {
    return request(app).delete('/condominiums').send(filter)
  }

  // async function getAllCondominiums(condominiumParams: CondominiumParams): Promise<Response> {}
  // async function getOneCondominium(queryStringArgs: ): Promise<Response> {}

  beforeEach(() => {
    condominiumParams = {
      name: validNameGen(),
      cnpj: validCnpjGen(),
      address: validAddressGen(),
      logoPath: validLogoPathGen()
    }

    const condominiumRepository = inMemoryCondominiumRepositoryFactory()
    condominiumRepository.deleteAll()
  })

  describe('create', () => {
    /* Propper usage*/
    it('should NOT throw an error if all of the fields are propperly initialized', async () => {
      /**
       * name: 3-30 chars
       * cnpj: 14 chars and no collision
       * address: 3-30 chars
       * logoPath: 3-30 chars (nullable)
       */
      const response = await createCondominium(condominiumParams)
      expect(response.status).toBe(200)
    })

    /* Base Fields */
    it('should throw a 400 error if the name is not provided', async () => {
      delete condominiumParams.name
      const response = await createCondominium(condominiumParams)
      expect(response.status).toBe(400)
      expect(response.body.error.condominium.name[0]).toBe('name is required')
    })
    it('should throw a 400 error if the CNPJ is not provided', async () => {
      delete condominiumParams.cnpj
      const response = await createCondominium(condominiumParams)
      expect(response.status).toBe(400)
      expect(response.body.error.condominium.cnpj[0]).toBe('cnpj is required')
    })
    it('should throw a 400 if the address is not provided', async () => {
      delete condominiumParams.address
      const response = await createCondominium(condominiumParams)
      expect(response.status).toBe(400)
    })
    it('should throw a 200 even if the logopath is not provided', async () => {
      delete condominiumParams.cnpj
      const response = await createCondominium(condominiumParams)
      expect(response.status).toBe(400)
      expect(response.body.error.condominium.cnpj[0]).toBe('cnpj is required')
    })

    /* Min Max Chars*/
    it('should throw an error if the name contains less than 3 chars', async () => {
      condominiumParams.name = faker.string.alpha(2)
      const response = await createCondominium(condominiumParams)
      expect(response.status).toBe(400)
      expect(response.body.error.condominium.name[0]).toBe('field must have at least 3 characters')
    })
    it('should throw an error if the name contains more than 30 chars', async () => {
      condominiumParams.name = faker.string.alpha(31)
      const response = await createCondominium(condominiumParams)
      expect(response.status).toBe(400)
      expect(response.body.error.condominium.name[0]).toBe('field must have at most 30 characters')
    })
    it('should throw an error if the cnpj does NOT contain 14 chars', async () => {
      condominiumParams.cnpj = faker.string.alpha(13)
      const response = await createCondominium(condominiumParams)
      expect(response.status).toBe(400)
      expect(response.body.error.condominium.cnpj[0]).toBe('field must have at least 14 characters')
    })
    it('should throw an error if the address contains less than 3 chars', async () => {
      condominiumParams.address = faker.string.alpha(2)
      const response = await createCondominium(condominiumParams)
      expect(response.status).toBe(400)
      expect(response.body.error.condominium.address[0]).toBe(
        'field must have at least 3 characters'
      )
    })
    it('should throw an error if the address contains more than 30 chars', async () => {
      condominiumParams.address = faker.string.alpha(31)
      const response = await createCondominium(condominiumParams)
      expect(response.status).toBe(400)
      expect(response.body.error.condominium.address[0]).toBe(
        'field must have at most 30 characters'
      )
    })

    /* Data Colision */
    it('should throw an error if the same CNPJ exists', async () => {
      const newCNPJ = validCnpjGen()
      condominiumParams.cnpj = newCNPJ
      await createCondominium(condominiumParams)
      condominiumParams.cnpj = newCNPJ
      const response = await createCondominium(condominiumParams)

      expect(response.status).toBe(400)
      expect(response.body.error.condominium.cnpj[0]).toBe('already exists')
    })
  })

  // @TODO delete other models that are related to condominium after condominium has been deleted.
  describe('delete', () => {
    it("should return 0 affected with a 200 status if a filter doesn't find any condominium", async () => {
      condominiumParams.name = faker.string.alpha(randomNumberGenerator.generateNumberRange(3, 30))
      const response = await deleteCondominium({ name: condominiumParams.name })
      expect(response.status).toBe(200)
      expect(response.body.data).toBe(0)
    })

    it('should return 1 affected with a 200 status if a filter finds one condominium', async () => {
      const newName = faker.string.alpha(randomNumberGenerator.generateNumberRange(3, 30))
      condominiumParams.name = newName
      createCondominium(condominiumParams)
      const response = await deleteCondominium({ name: newName }) // TODO apagar pelo id
      expect(response.status).toBe(200)
      expect(response.body.data).toBe(1)
    })

    it('should delete just the one that fits in with the filter', async () => {
      // Name that all of them will have
      const defaultedName = validNameGen()

      const lastUsedCNPJ = validCnpjGen()
      let randomCNPJ = ''
      {
        randomCNPJ = validCnpjGen()
        assert(randomCNPJ != lastUsedCNPJ)
        condominiumParams.name = defaultedName
        condominiumParams.cnpj = randomCNPJ
        await createCondominium(condominiumParams)
      }

      {
        randomCNPJ = validCnpjGen()
        assert(randomCNPJ != lastUsedCNPJ)
        condominiumParams.name = defaultedName
        condominiumParams.cnpj = randomCNPJ
        await createCondominium(condominiumParams)
      }

      {
        condominiumParams.name = defaultedName
        condominiumParams.cnpj = lastUsedCNPJ
        await createCondominium(condominiumParams)
      }

      const response = await deleteCondominium({ name: defaultedName, cnpj: lastUsedCNPJ })
      expect(response.status).toBe(200)
      expect(response.body.data).toBe(1)
    })
  })

  // GetAll:
})
