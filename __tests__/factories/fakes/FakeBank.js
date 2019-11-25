const faker = require('faker')

const FakeBank = () => ({
  code: faker.random.number(),
  name: faker.name.findName(),
  icon: faker.random.word(),
  rating: faker.random.number(),
})

module.exports = FakeBank
