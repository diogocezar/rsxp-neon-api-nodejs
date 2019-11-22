const faker = require('faker')

const FakePushSend = {
  id: faker.random.number(),
  idLead: faker.random.number(),
  pushType: faker.random.number(),
  title: faker.random.words(),
  message: faker.random.words(),
  sendDate: faker.date.past(),
  read: 'false',
  readDate: faker.date.past(),
  date: faker.date.past(),
  removed: 0,
  screenTitle: faker.random.words(),
  url: faker.internet.url(),
  type: faker.random.words(),
  pushKey: faker.random.words(),
  payload: faker.random.words(),
  subject: faker.random.words(),
}

module.exports = FakePushSend
