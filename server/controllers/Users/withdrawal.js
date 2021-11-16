const { User, Post } = require('../../models');
const { isAuthorized, checkRefreshToken } = require('../tokenFunctions');
module.exports = (req, res) => {
  const userAccessToken = isAuthorized(req);
  //엑세스 토큰을 받아서 검증 후에  회원탈퇴가 이루어진다.
  const refToken = req.cookies.refreshToken;
  if (!userAccessToken) {
    const userInfo = checkRefreshToken(refToken);
    Post.findAll({
      include: [
        {
          model: User,
          attributes: ['id'],
        },
      ],
      where: { userId: User.id },
    }).then((PostList) => {
      if (PostList.length === 0) return;
      return Post.destroy({ where: { userId: id } });
    });
    User.destroy({ where: { userId: userInfo.userId } }).then((user) => {
      return res.status(204).json({ message: '회원탈퇴가 완료되었습니다.' });
    });
  }
  //
  //토큰이 일치하면 작성했던 핀 모두 없애버리고 회원정보까지 없앤다.
};
// 회원 게시글 전부 삭제, 아이디 정보 삭제 -> where조건을 찾아야한다.
// 테이블명은 복수이므로 Post, User 을 복수로 고치는 방법도 생각해두자.
// Post 테이블의 userid 와 Users 테이블의 id 는 외래키로 연결되어있다.
// User 테이블 에서 특정 유저를 지우면 그 유저의 id와 연결된 Post 들이 모두 삭제된다 (추측)
// 그러므로 mysql로 Post데이터를 임의로 만들어 넣어주고
// Postman을 사용하여 id를 받았을때 일치하는 User의 row를 삭제하게 만든다.

/*UserPhone.findAll({attributes: ['userId'], where: {phoneNumber: '1234'}}
.then(function (userIds) {
  if (userIds.length === 0) 
     return Promise.resolve(true) //nothing to delete
  return User.destroy({where: {id: {$in: userIds}}});
})*/
