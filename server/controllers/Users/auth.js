const { isAuthorized, checkRefreshToken } = require('../tokenFunctions');

module.exports = (req) => {
  const accessTokenData = isAuthorized(req);
  const refreshToken = req.cookies.refreshToken;
  if (!accessTokenData) {
    const userInfo = checkRefreshToken(refreshToken);
    if (!userInfo) {
      return null;
    } else {
      console.log(userInfo);
      return userInfo;
    }
  } else {
    return accessTokenData;
  }
};
