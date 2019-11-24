const faker = require('faker')

const FakeRating = () => ({
  idBank: 1,
  idUser: faker.random.word() + faker.random.uuid(),
  rating: Math.floor(Math.random() * 5) + 1,
})

module.exports = FakeRating
