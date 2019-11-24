module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'ratings',
    [
      {
        id_bank: 1,
        id_user: 1,
        rating: 5,
      },
      {
        id_bank: 1,
        id_user: 2,
        rating: 4,
      },
      {
        id_bank: 1,
        id_user: 3,
        rating: 1,
      },
    ],
    {},
  ),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('ratings', null, {}),
}
