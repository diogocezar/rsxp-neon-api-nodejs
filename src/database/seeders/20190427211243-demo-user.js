module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'users',
    [
      {
        name: 'John',
        email: 'demo@demo.com',
        password_hash: '123',
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('users', null, {}),
}
