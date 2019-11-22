const faker = require('faker')

const FakeBank = {
  id: faker.random.number(),
  name: faker.name.findName(),
  icon: faker.random.word(),
  rating: faker.random.number(),
}

module.exports = FakeBank
