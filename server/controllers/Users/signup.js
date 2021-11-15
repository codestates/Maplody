const { User } = require('../../models');
const crypto = require('crypto');
const { generateAccessToken } = require('../tokenFunctions');

module.exports = (req, res) => {
  const { userId, nickname, email, password, image } = req.body;
  //회원가입시 입력되서 바디에 담겨져서 오는 정보들.
  const salt = Math.round(new Date().valueOf() * Math.random()) + '';
  const hashPassword = crypto
    .createHash('sha512')
    .update(password + salt)
    .digest('hex');
  // 그 정보를 토대로 유저의 보안을 위해 솔트와 해시패스워드 생성
  if (!userId || !nickname || !email || !password) return res.status(422).send('입력되지않은 항목이 존재합니다.');
  // 만약 가입할때 정보가 다 안들어 왔으면  가입안되게끔

  User.findOrCreate({
    where: { userId: userId },
    defaults: {
      userId: userId,
      nickname: nickname,
      email: email,
      password: hashPassword,
      salt: salt,
      image: image,
    },
  })
    .then(([userInfo, created]) => {
      if (!created) {
        return res.status(400).json({ message: '중복된 아이디 입니다.' });
      }
      res.status(201).json({ message: '회원가입이 완료되었습니다.' });
    })
    .catch((err) => {
      console.log(err);
    });

  // User.findOne({ where: { userId: userId } }).then((data) => {
  //   if (data) {
  //     return res.status(409).json({ message: '아이디가 이미 존재합니다.' });
  //   }
  //   // 모든 정보가 입력되어서 바디에 담겨져서 왔을때 만약 아이디가 데이터베이스에 존재한다?
  //   // 그러면 또 가입불가. 없는 경우는 입력받은 데이터를 토대로 데이터베이스에 테이블 안에 자료생성
  //   User.create({
  //     userId: userId,
  //     nickname: nickname,
  //     email: email,
  //     password: hashPassword,
  //     salt: salt,
  //     image: image,
  //   }).then((data) => {
  //     const accessToken = generateAccessToken(req.body);
  //     // sendAccessToken(res, accessToken);
  //     return res.status(201).json({ data: accessToken, message: '회원가입 성공' });
  //   });
  // });
};
/**
 회원가입시 body로 오는 자료는
 userId :  로그인시 쓰이는 Id
 nickname : 아이디 말고 따로 보여지는 닉네임
 email : maplody 소식을 전달이나 혹은 비밀번호 찾기를 위한 인증수단 이메일
 password : 로그인시 userId와 짝을 이루어 필요함
 image : optional , 넣으면 그 이미지 적용 안넣으면 default한 이미지를 넣어준다.

 추가로 관리자 권한을 넣어줄 필요가 있다고 생각됨. 

http 응답코드 추가가 이루어져야함.
상태코드 409,422 추가
409 요청이 충돌이 일어났을때 나오는 응답/우리의 경우는 이미 아이디가 존재해서 "충돌"하니까
422 요청이문법오류등으로 응답할수 없을때 / 우리의 경우는 뭔가 입력되지않아서 일치하지않는경우에 쓰임
*/
