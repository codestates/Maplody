'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        id: 2,
        nickname: 'NICK1',
        userId: 'User1',
        password:
          'af4c047d13652b3d55775a421045d2a0b0f3f0ee95fd8f2d9691e53b501f9b77af1524f9890b67ff6e12c2d5b29aad38028fdea54ad4a90984c930ec4b7f63a5',
        email: 'email@email.com',
        salt: '1172463193160',
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
// 유저 아이디 :  User1 ,비밀번호 :  12345
