const { factory } = require('factory-girl')
const {
  Bank,
  Rating,
} = require('../../src/models')

const FakeBank = require('../factories/fakes/FakeBank')
const FakeRating = require('../factories/fakes/FakeRating')

factory.define('Bank', Bank, FakeBank)
factory.define('Rating', Rating, FakeRating)

module.exports = factory
