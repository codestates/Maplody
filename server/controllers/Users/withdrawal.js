const { User } = require('../../models');
const { checkRefreshToken } = require('../tokenFunctions');
const { auth } = require('../Users/auth');

module.exports = async (req, res) => {
  const userInfo = await auth(req);
  //프론트의 WithdrawalModal에서 req에 accessToken을 담아서 보내준다.
  // 이것을 검증한다.
  const refToken = req.cookies.refreshToken;
  if (!userInfo) {
    const userInfo = checkRefreshToken(refToken);
    User.destroy({ where: { userId: userInfo.userId } }).then((user) => {
      return res.status(204).json({ message: '회원탈퇴가 완료되었습니다.' });
    });
  }
};
