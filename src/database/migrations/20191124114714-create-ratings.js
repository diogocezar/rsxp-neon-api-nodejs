module.exports = {
  up: (queryInterface, DataTypes) => queryInterface.createTable('ratings', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    id_bank: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'banks',
        },
        key: 'id',
      },
      allowNull: false,
    },
    id_user: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    rating: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    created_at: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.literal('NOW()'),
    },
    updated_at: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  }),
  down: queryInterface => queryInterface.dropTable('ratings'),
}
