const { Model, DataTypes } = require('sequelize')

class Ranting extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        idBank: {
          type: DataTypes.INTEGER,
          field: 'id_bank',
          allowNull: false,
          references: {
            model: 'banks',
            key: 'id',
          },
        },
        idUser: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        rating: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'rantings',
      },
    )
  }
}

module.exports = Ranting
