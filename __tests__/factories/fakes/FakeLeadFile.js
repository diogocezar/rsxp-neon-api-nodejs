const faker = require('faker')

const FakeLeadFile = {
  id: faker.random.number(),
  idLead: faker.random.number(),
  idFileType: faker.random.number(),
  date: faker.date.past(),
  name: faker.name.findName(),
  code: faker.random.uuid(),
  size: faker.random.number(),
  removed: 0,
  url: faker.internet.url(),
}

module.exports = FakeLeadFile
