module.exports = (req, res) => {
  return res
    .clearCookie('refreshToken', {
      sameSite: 'none',
      secure: true,
      httpOnly: true,
    })
    .status(200)
    .send('로그아웃 성공');
};
