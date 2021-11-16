const { User } = require('../../models');
const { isAuthorized, checkRefreshToken } = require('../tokenFunctions');

module.exports = (req, res) => {
  const accessTokenData = isAuthorized(req);
  const refreshToken = req.cookies.refreshToken;
  if (!accessTokenData) {
    const userInfo = checkRefreshToken(refreshToken);
    if (!userInfo) {
      return null;
    } else {
      User.findOne({ where: { userId: accessTokenData.dataValues.userId } })
        .then((data) => {
          delete data.dataValues.password;
          return data.dataValues;
        })
        .catch((err) => console.log(err));
    }
  }
  return accessTokenData.dataValues;
};
