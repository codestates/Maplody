module.exports = (req, res) => {
  return res.clearCookie('refreshToken').status(200).send('로그아웃 성공');
};
