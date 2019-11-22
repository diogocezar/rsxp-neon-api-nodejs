const { sequelize } = require('@/models')

const models = Object.values(sequelize.models).reverse()

module.exports = async () => Promise.all(
  Object.keys(models).map(key => models[key].destroy({ truncate: { cascade: true }, force: true })),
)
