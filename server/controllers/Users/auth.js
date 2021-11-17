const { User } = require('../../models');
const { isAuthorized, checkRefreshToken } = require('../tokenFunctions');

module.exports = {
  auth: async (req, res) => {
    const accessTokenData = isAuthorized(req);
    const refreshToken = req.cookies.refreshToken;
    if (!accessTokenData) {
      const userInfo = checkRefreshToken(refreshToken);
      if (!userInfo) {
        return null;
      } else {
        const resp = await User.findOne({ where: { userId: userInfo.userId } });
        delete resp.dataValues.password;
        return resp.dataValues;
      }
    } else {
      return accessTokenData;
    }
  },
};
