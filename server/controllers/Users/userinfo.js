const { User } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = (req, res) => {
  const userInfo = isAuthorized(req);
  if (userInfo) {
    const { userId } = userInfo;
    Post.findAll({
      include: [
        {
          model: User,
          attributes: ['id',''],
        },
      ],
      where: { userId: User.id },
    });
  }
};
// 클라이언트에서 필요로 하는 정보는
// 닉네임,유저아이디,포스트카운트, 계정생성날짜
// 포스트 - 노래제목,가수이름,장소,유툽 썸네일,포스트생성날짜

//포스트에 담긴 정보는 id , place , musicTitle,musicArtist,createdAt,updatedAt,url,storyboard
//유저에 담긴 정보는 id,userId,nickname,이메일,비번,솔트,가입일,업데이트일 등등.
//이걸 각각 가져오다음 조인 해야할듯?
