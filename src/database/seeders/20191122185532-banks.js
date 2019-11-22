module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'banks',
    [
      {
        name: 'Neon',
        code: 655,
        icon: 'neon.png',
        rating: 5,
      },
      {
        name: 'Banco Vestido',
        code: 213,
        icon: 'banco-vestido.png',
        rating: 5,
      },
    ],
    {},
  ),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('banks', null, {}),
}
