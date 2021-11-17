const { User } = require('../../models');
const auth = require('../Users/auth');

module.exports = async (req, res) => {
  const userInfo = await auth(req);
  //프론트의 WithdrawalModal에서 req에 accessToken을 담아서 보내준다.
  // 이것을 검증한다.
  if (!userInfo) {
    return res.status(400).json({ message: '로그인이 필요합니다' });
  }
  User.destroy({ where: { userId: userInfo.userId } }).then((user) => {
    return res
      .clearCookie('refreshToken', {
        sameSite: 'none',
        secure: true,
        httpOnly: true,
      })
      .status(204)
      .json({ message: '회원탈퇴가 완료되었습니다.' });
  });
};
