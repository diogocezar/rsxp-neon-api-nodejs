module.exports = {
  up: (queryInterface, DataTypes) => queryInterface.createTable('users', {
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
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    password_hash: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    created_at: {
      allowNull: false,
      type: DataTypes.DATE,
      // defaultValue: DataTypes.literal('NOW()'),
    },
    updated_at: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  }),
  down: queryInterface => queryInterface.dropTable('users'),
}
