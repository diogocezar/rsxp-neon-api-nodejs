const faker = require('faker')

const FakeUser = {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  cpf: Math.floor(Math.random() * 100000000000).toString(),
  phone: '11987654321',
}

module.exports = FakeUser
