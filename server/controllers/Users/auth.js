const { user } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = (req, res) => {
  const accessTokenData = isAuthorized(req);
  if (!accessTokenData) {
    res.status(401).send({ data: null, message: '인증되지 않은 사용자입니다.' });
  } else {
    user
      .findOne({ where: { email: accessTokenData.email } })
      .then((data) => {
        delete data.dataValues.password;
        res.status(200).json({ data: { userInfo: data.dataValues } });
      })
      .catch((err) => console.log(err));
  }
};
