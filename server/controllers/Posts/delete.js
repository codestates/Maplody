const { Post } = require('../../models');
const auth = require('../Users/auth');

module.exports = (req, res) => {
  const userInfo = auth(req);
  if (!userInfo) {
    return res.status(401).json({ message: '로그인이 필요합니다' });
  } else {
    const { id } = req.params;

    Post.destroy({
      where: { id },
    })
      .then((res) => {
        return res.status(204).json({ message: '게시물이 삭제되었습니다' });
      })
      .catch((err) => {
        return res.status(400).json({ message: '잘못된 요청입니다' });
      });
  }
};
