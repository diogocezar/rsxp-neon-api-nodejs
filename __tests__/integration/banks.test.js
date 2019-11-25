const request = require('supertest')
const app = require('../../src/app')
const truncate = require('../helpers/TruncateHelper')
const factory = require('../factories')

describe('Banks Controller', () => {
  let defaultBank
  beforeEach(async () => {
    await truncate()
    defaultBank = await factory.create('Bank')
    await factory.create('Rating', { idBank: defaultBank.id })
  })

  describe('GET /banks', () => {
    it('should get all banks', async (done) => {
      const response = await request(app)
        .get('/banks')
        .set('id_user', 'A1B2C3D4')
        .send()

      expect(response.status).toBe(200)

      const data = response.body
      expect(data).toBeInstanceOf(Array)
      expect(data.length).toBeGreaterThanOrEqual(1)

      const [firstBank] = data
      expect(firstBank).toHaveProperty('id', defaultBank.id)
      expect(firstBank).toHaveProperty('name', defaultBank.name)
      expect(firstBank).toHaveProperty('code', defaultBank.code)
      expect(firstBank).toHaveProperty('icon', defaultBank.icon)
      expect(firstBank).toHaveProperty('generalRating')
      expect(firstBank).toHaveProperty('myRating')
      done()
    })
  })
})
