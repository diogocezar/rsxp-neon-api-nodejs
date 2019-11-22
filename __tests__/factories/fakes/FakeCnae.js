const faker = require('faker')

const FakeCnae = {
  id: faker.random.number(),
  code: faker.random.number(),
  name: faker.name.findName(),
  removed: 0,
}

module.exports = FakeCnae
