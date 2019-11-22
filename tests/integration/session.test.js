const request = require('supertest')
const app = require('../../src/app')
const truncate = require('../helpers/TruncateHelper')
const factory = require('../factories')

describe('Autentication', () => {
  beforeEach(async () => {
    await truncate()
  })
  it('should autenticate with valid credentials', async () => {
    const user = await factory.create('User', {
      password: '123123',
    })

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123123',
      })
    expect(response.status).toBe(200)
  })
  it('should not autenticate with invalid credentials', async () => {
    const user = await factory.create('User', {
      password: '123123',
    })

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123456',
      })
    expect(response.status).toBe(401)
  })
  it('should return jwt token when autenticated', async () => {
    const user = await factory.create('User', {
      password: '123123',
    })

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123123',
      })
    expect(response.body).toHaveProperty('token')
  })
  it('should be able to access private routes when authenticated', async () => {
    const user = await factory.create('User', {
      password: '123123',
    })

    const response = await request(app)
      .get('/dashboard')
      .set('Authorization', `Bearer ${user.generateToken()}`)
    expect(response.status).toBe(200)
  })
  it('should be not able to access private routes without jwt token', async () => {
    const response = await request(app).get('/dashboard')
    expect(response.status).toBe(401)
  })
  it('should be not able to access private routes with wrong jwt token', async () => {
    const response = await request(app)
      .get('/dashboard')
      .set('Authorization', 'Bearer 123123')
    expect(response.status).toBe(401)
  })
})
