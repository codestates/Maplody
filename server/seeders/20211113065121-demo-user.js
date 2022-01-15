'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        id: 2,
        nickname: 'nickname',
        userId: 'test',
        password:
          '541b6294f3839c1abd780e59265bb26b64d6afdfc4dea825f9d90cab70e03f471995e2829af44b9d4bc35e6a3db01f378e42020c305ad5001b0ca56daa799c74',
        email: 'email@email.com',
        salt: `1462336181035`,
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
