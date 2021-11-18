const { User } = require('../../models');
const { checkRefreshToken } = require('../tokenFunctions');
const { auth } = require('../Users/auth');

module.exports = async (req, res) => {
  const userInfo = await auth(req);
  const refToken = req.cookies.refreshToken;
  if (!userInfo) {
    const userInfo = checkRefreshToken(refToken);
    User.destroy({ where: { userId: userInfo.userId } }).then((user) => {
      return res.status(204).json({ message: '회원탈퇴가 완료되었습니다.' });
    });
  }
};
