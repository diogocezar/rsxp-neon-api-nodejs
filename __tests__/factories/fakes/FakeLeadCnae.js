const faker = require('faker')

const FakeCnae = {
  id: faker.random.number(),
  idLead: faker.random.number(),
  idCnae: faker.random.number(),
  main: true,
  removed: 0,
}

module.exports = FakeCnae
