const bcrypt = require('bcryptjs')
const { User } = require('../../src/models')
const truncate = require('../helpers/TruncateHelper')

describe('User', () => {
  beforeEach(async () => {
    await truncate()
  })
  it('should encrypt user password', async () => {
    const user = await User.create({
      name: 'Diogo Cezar',
      email: 'diogo@diogocezar.com',
      password: '123456',
    })
    const compareHash = await bcrypt.compare('123456', user.password_hash)
    expect(compareHash).toBe(true)
  })
})
