const { user } = require('../../models');

module.exports = (req, res) => {
  // TODO: 회원가입 및 사용자 생성 로직을 작성하세요.
  const { userId, nickname, email, password, image } = req.body;
  if (!userId || !nickname || !email || !password) return res.status(422).send('입력되지않은 항목이 존재합니다.');

  user.findOne({ where: { userId: userId } }).then((data) => {
    if (data) return res.status(409).json({ message: '아이디가 이미 존재합니다.' });

    user.create(req.body).then((data) => {
      const accessToken = generateAccessToken(req.body);
      sendAccessToken(res, accessToken);
      // 검증이 끝나면 토큰 생성하고 또 토큰인증을 받아야하는데 좀 다르게해보고싶다,??
      return res.status(201).json({ message: '회원가입 성공' });
    });
  });
};
/**
 회원가입시 body로 오는 자료는
 userId :  로그인시 쓰이는 Id
 nickname : 아이디 말고 따로 보여지는 닉네임
 email : maplody 소식을 전달이나 혹은 비밀번호 찾기를 위한 인증수단 이메일
 password : 로그인시 userId와 짝을 이루어 필요함
 image : optional , 넣으면 그 이미지 적용 안넣으면 default한 이미지를 넣어준다.

http 응답코드 추가가 이루어져야함.
상태코드 409,422 추가
409 요청이 충돌이 일어났을때 나오는 응답/우리의 경우는 이미 아이디가 존재해서 "충돌"하니까
422 요청이문법오류등으로 응답할수 없을때 / 우리의 경우는 뭔가 입력되지않아서 일치하지않는경우에 쓰임
*/
