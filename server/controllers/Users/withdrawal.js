const { User, Post } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');
module.exports = (req, res) => {
  const userAccessToken = isAuthorized(req);
  //엑세스 토큰을 받아서 검증 후에  회원탈퇴가 이루어진다.
  if (!userAccessToken) {
    return res.status(401).json({ message: '로그인이 필요합니다.' });
  }
  //토큰이 일치하면 작성했던 핀 모두 없애버리고 회원정보까지 없앤다.
  Post.destroy({ where: { userId: userAccessToken.userId } });
  User.destroy({ where: { userId: userAccessToken.userId } }).then((user) => {
    return res.status(204).json({ message: '회원탈퇴가 완료되었습니다.' });
  });
};
//userId에 들어오는게 userAccess 토큰에 뭐 들어오는지 체크하자
