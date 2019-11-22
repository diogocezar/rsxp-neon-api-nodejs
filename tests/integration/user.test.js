const request = require('supertest')
const faker = require('faker')
const factory = require('../factories')
const app = require('../../src/app')
const truncate = require('../helpers/TruncateHelper')

describe('User', () => {
  beforeEach(async () => {
    await truncate()
  })
  it('should create user using route', async () => {
    const user = await factory.create('User', {
      password: '123123',
    })
    const response = await request(app)
      .post('/user')
      .send({
        name: user.name,
        email: user.email,
        password: user.password,
      })
    expect(response.status).toBe(200)
  })
  it('should not create user with empty name', async () => {
    const user = await factory.create('User', {
      password: '123123',
    })
    const response = await request(app)
      .post('/user')
      .send({
        name: '',
        email: user.email,
        password: user.password,
      })
    expect(response.status).toBe(422)
  })
  it('should not create user with empty email', async () => {
    const user = await factory.create('User', {
      password: '123123',
    })
    const response = await request(app)
      .post('/user')
      .send({
        name: faker.name.findName(),
        email: '',
        password: user.password,
      })
    expect(response.status).toBe(422)
  })
  it('should not create user with empty password', async () => {
    const user = await factory.create('User', {
      password: '123123',
    })
    const response = await request(app)
      .post('/user')
      .send({
        name: user.name,
        email: faker.internet.email(),
        password: '',
      })
    expect(response.status).toBe(422)
  })
  it('should get user from route', async () => {
    const user = await factory.create('User', {
      password: '123123',
    })
    const response = await request(app)
      .get(`/user/${user.id}`)
      .send()
    expect(response.body).toHaveProperty('success', true)
  })
})
