const { factory } = require('factory-girl')
const {
  Bank,
} = require('../../src/models')

const FakeBank = require('../factories/fakes/FakeBank')

factory.define('Bank', Bank, FakeBank)

module.exports = factory
