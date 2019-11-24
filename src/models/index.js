/* eslint-disable */

const Sequelize = require('sequelize')
const config = require('../config/database')

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
)

const models = {
  Bank: require('../models/Bank'),
  Ranting: require('../models/Ranting'),
}

Object.values(models).forEach(model => model.init(sequelize))

Object.values(models)
  .filter(model => typeof model.associate === 'function')
  .forEach(model => model.associate(models))

const db = {
  ...models,
  sequelize,
}

module.exports = db
