module.exports = {
  up: (queryInterface, DataTypes) => queryInterface.createTable('logs', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    request: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    response: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    method: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    start_date: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    end_date: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    created_at: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updated_at: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  }),

  down: queryInterface => queryInterface.dropTable('logs'),
}
