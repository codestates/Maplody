const { Post, User } = require('../../models');
const auth = require('./auth');
const crypto = require('crypto');

module.exports = {
  get: async (req, res) => {
    const userInfo = await auth(req);
    const postList = await Post.findAll({ where: { userId: userInfo.id } });
    if (!userInfo) {
      return res.status(401).json({ message: '로그인이 필요합니다' });
    } else {
      res.status(200).json({ userinfo: { userInfo, postList }, message: '요청한 유저 정보입니다' });
    }
  },
  put: async (req, res) => {
    const userInfo = await auth(req);
    console.log(req.body);
    console.log(userInfo);
    const { nickname, password } = req.body;
    if (!userInfo) {
      return res.status(401).json({ message: '로그인이 필요합니다' });
    } else {
      const hashPassword = crypto
        .createHash('sha512')
        .update(password + userInfo.salt)
        .digest('hex');
      if (!nickname || !password) {
        return res.status(400).json({ message: '잘못된 요청 입니다.' });
      } else {
        User.findOne({ where: { userId: userInfo.userId } }).then((findUser) => {
          findUser.update({
            nickname: nickname,
            password: hashPassword,
          });
          console.log(findUser.dataValues);
          res.status(200).json({ userinfo: findUser.dataValues, message: '정보가 수정 되었습니다.' });
        });
        // User.update({
        //   nickname: nickname,
        //   password: hashPassword,
        // });
      }
    }
  },
};
// 클라이언트에서 필요로 하는 정보는
// 닉네임,유저아이디,포스트카운트, 계정생성날짜
// 포스트 - 노래제목,가수이름,장소,유툽 썸네일,포스트생성날짜

//포스트에 담긴 정보는 id , place , musicTitle,musicArtist,createdAt,updatedAt,url,storyboard
//유저에 담긴 정보는 id,userId,nickname,이메일,비번,솔트,가입일,업데이트일 등등.
//이걸 각각 가져오다음 조인 해야할듯?
