require('dotenv').config();
const { sign, verify } = require('jsonwebtoken');

module.exports = {
  generateAccessToken: (data) => {
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: '60s' });
  },
  generateRefreshToken: (data) => {
    return sign(data, process.env.REFRESH_SECRET, { expiresIn: '30d' });
  },
  sendRefreshToken: (res, refreshToken) => {
    res.cookie('refreshToken', refreshToken, {
      sameSite: 'none',
      secure: true,
      httpOnly: true,
    });
  },
  sendAccessToken: (res, accessToken) => {
    res.json({ data: accessToken, message: '엑세스 토큰 보내기 성공' });
  },
  isAuthorized: (req) => {
    const authorization = req.headers['authorization'];
    if (!authorization) {
      console.log('return null');
      return null;
    }
    const token = authorization.split(' ')[1];
    try {
      return verify(token, process.env.ACCESS_SECRET);
    } catch (err) {
      return null;
    }
  },
  checkRefreshToken: (refreshToken) => {
    try {
      return verify(refreshToken, process.env.REFRESH_SECRET);
    } catch (err) {
      return null;
    }
  },
};
