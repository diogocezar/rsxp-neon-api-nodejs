const faker = require('faker')

const FakeFileType = {
  id: faker.random.number(),
  name: faker.name.findName(),
  removed: 0,
}

module.exports = FakeFileType
