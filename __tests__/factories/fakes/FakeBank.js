const faker = require('faker')

const FakeUser = {
  id: faker.random.number(),
  name: faker.name.findName(),
  image: faker.random.word(),
  rating: faker.random.number(),
}

module.exports = FakeUser
