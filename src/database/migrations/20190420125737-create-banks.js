module.exports = {
  up: (queryInterface, DataTypes) => queryInterface.createTable('banks', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    image: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    rating: {
      allowNull: false,
      type: DataTypes.STRING,
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
  down: queryInterface => queryInterface.dropTable('banks'),
}
