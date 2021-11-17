'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Posts', [
      {
        id: 1,
        userId: 2,
        musicArtist: 'Dean',
        musicTitle: 'Dayfly',
        url: 'Z3W0jKcv1SU',
        getAddress: '대치동',
        storyBoard: '하루살이 두루살이 세루살이',
        createdAt: new Date(),
        updatedAt: new Date(),
        lat: 37.49893,
        lng: 127.061403,
      },
      {
        id: 2,
        userId: 2,
        musicArtist: '헨리',
        musicTitle: `It's you`,
        url: '06P_qZ3gu_Y',
        getAddress: '남산 공원',
        storyBoard: '남들은 걸어올라가고 나는 케이블카타고 야호~~',
        createdAt: new Date(),
        updatedAt: new Date(),
        lat: 37.550976488284654,
        lng: 126.99095582962613,
      },
      {
        id: 3,
        userId: 2,
        musicArtist: 'Zion.T',
        musicTitle: '양화대교',
        url: 'uLUvHUzd4UA',
        getAddress: '양화대교',
        storyBoard: '야근 끝내고 집가는 택시비가 비싸서 양화대교를 걸어서 건너던 그때가 생각나네요.,.,',
        createdAt: new Date(),
        updatedAt: new Date(),
        lat: 37.543709,
        lng: 126.904409,
      },
      {
        id: 4,
        userId: 2,
        musicArtist: '10cm',
        musicTitle: '어제 너는 나를 버렸어',
        url: 'iFtaamxiasY',
        getAddress: '홍대 대학로',
        storyBoard: '아니 이런말 하면 찌질한거같긴한데 헤어질꺼면 내가 선물한거 돌려주라..',
        createdAt: new Date(),
        updatedAt: new Date(),
        lat: 37.576148,
        lng: 127.001742,
      },
      {
        id: 5,
        userId: 2,
        musicArtist: '버스커버스커',
        musicTitle: '벚꽃엔딩',
        url: 'tXV7dfvSefo',
        getAddress: '보라매공원',
        storyBoard: '그날 공원에서 본 벚꽃은 너랑 무척 닮았다',
        createdAt: new Date(),
        updatedAt: new Date(),
        lat: 37.493539,
        lng: 126.91939,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Posts', null, {});
  },
};
