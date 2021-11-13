module.exports = (req, res) => {
  return res.clearCookie('jwt').status(200).send('로그아웃 성공');
};
