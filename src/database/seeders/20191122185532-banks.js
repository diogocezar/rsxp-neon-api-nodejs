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
      {
        name: 'D7',
        code: 122,
        icon: 'd7.png',
        rating: 5,
      },
      {
        name: 'Banco Grêmio',
        code: 123,
        icon: 'banco-gremio.png',
        rating: 5,
      },
      {
        name: 'Box Bank',
        code: 425,
        icon: 'box-bank.png',
        rating: 5,
      },
      {
        name: 'Lento Bank',
        code: 345,
        icon: 'lento-bank.png',
        rating: 5,
      },
      {
        name: 'Lento Bank',
        code: 345,
        icon: 'lento-bank.png',
        rating: 5,
      },
    ],
    {},
  ),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('banks', null, {}),
}
