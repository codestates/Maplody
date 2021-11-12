const { user } = require('../../models');
const { generateAccessToken, sendAccessToken } = require('../tokenFunctions');

module.exports = (req, res) => {
  const { userId, password } = req.body;
  user.findOne({ where: { userId: userId, password: password } }).then((data) => {
    if (!data) {
      return res.status(400).send('유효하지 않은 로그인입니다.');
    }
    delete data.dataValues.password;
    const accessToken = generateAccessToken(data.dataValues);
    sendAccessToken(res, accessToken);
    return res.status(200).json({ message: '로그인 성공' });
  });
};
