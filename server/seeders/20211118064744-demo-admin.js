'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        id: 1,
        nickname: '관리자',
        userId: 'admin',
        password:
          '4befdf84e456cbd509ed7dd45ee7d095e4659793e38c3d190e2e1ffb5cc240d400962d33c2ed581e3dfde142f1f6bbfad8549c1d1b9c08a2f3e4dbbd81f2fb53',
        email: 'email@email.com',
        salt: `670866691073`,
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
