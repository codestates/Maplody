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
//쿠키로 보낸 리프레시 토큰을 지우고 로그아웃 성공을 보내준다.
