const request = require('supertest')
const faker = require('faker')
const factory = require('../factories')
const app = require('../../src/app')
const truncate = require('../helpers/TruncateHelper')

describe('User', () => {
  beforeEach(async () => {
    await truncate()
  })
  it('should return idhash', async () => {
    const user = await factory.create('User', {
      password: '123123',
    })
    const response = await request(app)
      .get('/idhash')
      .send({
        idHash: 'kpxgGTKAx94v9aDsLNqIgg==',
      })
    expect(response.body).toHaveProperty('idClient', 2)
  })
})
