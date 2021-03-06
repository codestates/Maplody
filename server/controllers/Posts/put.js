const { Post } = require('../../models');
const auth = require('../Users/auth');

module.exports = (req, res) => {
  const userInfo = auth(req);
  if (!userInfo) {
    return res.status(401).json({ message: '로그인이 필요합니다' });
  } else {
    const { id } = req.params;
    const { musicArtist, musicTitle, url, place, storyboard } = req.body;
    Post.findOne({
      where: { id },
    })
      .then((found) => {
        found
          .update({
            musicArtist,
            musicTitle,
            url,
            place,
            storyboard,
          })
          .then((findPost) => {
            return res.status(200).json({ message: '게시물 수정이 완료되었습니다' });
          })
          .catch((err) => {
            return res.status(400).json({ message: '잘못된 요청입니다' });
          });
      })
      .catch((err) => {
        return res.status(400).json({ message: '잘못된 요청입니다' });
      });
  }
};
