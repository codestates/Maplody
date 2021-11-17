const { isAuthorized, checkRefreshToken } = require('../tokenFunctions');

module.exports = async (req, res) => {
  const accessTokenData = isAuthorized(req);
  const refreshToken = req.cookies.refreshToken;
  if (!accessTokenData) {
    const userInfo = checkRefreshToken(refreshToken);
    if (!userInfo) {
      return null;
    } else {
      delete userInfo.dataValues.password;
      res.status(200).json({ userInfo: userInfo.dataValues });
      return userInfo.dataValues;
    }
  } else {
    res.status(200).json({ userInfo: accessTokenData });
    return accessTokenData;
  }
};
