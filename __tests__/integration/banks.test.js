const request = require('supertest')
const app = require('../../src/app')
const truncate = require('../helpers/TruncateHelper')


describe('Banks Controller', () => {
  beforeEach(async () => {
    await truncate()
  })

  describe('GET /banks', () => {
    it('should get all banks', async (done) => {
      const response = await request(app)
        .get('/v1/banks')
        .set('deviceId', 'A1B2C3D4')
        .send()

      expect(response.status).toBe(200)

      const data = response.body
      expect(data).toBeInstanceOf(Array)
      expect(data.length).toBeGreaterThanOrEqual(1)

      const [firstBank] = data
      expect(firstBank).toHaveProperty('id')
      expect(firstBank).toHaveProperty('name')
      expect(firstBank).toHaveProperty('code')
      expect(firstBank).toHaveProperty('icon')
      expect(firstBank).toHaveProperty('generalRating')
      expect(firstBank).toHaveProperty('myRating')
      done()
    })
  })

  describe('POST /ratings', () => {
    it('should create a rating', async (done) => {
      const rating = {
        bankId: 1,
        rating: 4,
      }
      const response = await request(app)
        .post('/v1/ratings')
        .set('deviceId', 'A1B2C3D4')
        .send(rating)

      expect(response.status).toBe(200)

      const data = response.body
      expect(data).toHaveProperty('rating', 4)
      done()
    })
  })
})
