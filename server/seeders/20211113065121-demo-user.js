'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        id: '0',
        nickname: 'JP',
        userId: 'userJP',
        password: '1234',
        email: 'JP@naver.com',
        salt: 'abc',
        image: 'image',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
