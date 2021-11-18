module.exports = (req, res) => {
  return res
    .clearCookie('refreshToken', {
      sameSite: 'none',
      secure: true,
      httpOnly: true,
      domain: ['www.maplody.site', 'maplody.site'],
    })
    .status(200)
    .send('로그아웃 성공');
};

