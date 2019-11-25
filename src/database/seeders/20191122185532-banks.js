module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'banks',
    [
      {
        name: 'Neon',
        code: 655,
        icon: 'neon.png',
      },
      {
        name: 'Banco Vestido',
        code: 213,
        icon: 'banco-vestido.png',
      },
      {
        name: 'D7',
        code: 122,
        icon: 'd7.png',
      },
      {
        name: 'Banco Grêmio',
        code: 123,
        icon: 'banco-gremio.png',
      },
      {
        name: 'Box Bank',
        code: 425,
        icon: 'box-bank.png',
      },
      {
        name: 'Lento Bank',
        code: 345,
        icon: 'lento-bank.png',
      },
      {
        name: 'Lento Bank',
        code: 345,
        icon: 'lento-bank.png',
      },
    ],
    {},
  ),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('banks', null, {}),
}
