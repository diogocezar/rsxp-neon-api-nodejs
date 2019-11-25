const request = require('supertest')
const app = require('../../src/app')
const truncate = require('../helpers/TruncateHelper')
const factory = require('../factories')

describe('Ratings Controller', () => {
  let defaultBank
  beforeEach(async () => {
    await truncate()
    defaultBank = await factory.create('Bank')
  })

  describe('POST /rate', () => {
    it('should create a rating', async (done) => {
      const rating = {
        idBank: defaultBank.id,
        rating: 4,
      }
      const response = await request(app)
        .post('/rate')
        .set('id_user', 'A1B2C3D4')
        .send(rating)

      expect(response.status).toBe(200)

      const data = response.body
      expect(data).toHaveProperty('success', true)
      done()
    })
  })
})
