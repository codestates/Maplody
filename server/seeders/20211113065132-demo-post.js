'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Posts', [
      {
        id: 0,
        userId: 1,
        song_artist: 'song_artist',
        song_title: 'song_title',
        song_image: 'song_image',
        song_location: 'song_location',
        content: 'content',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Posts', null, {});
  },
};
