const { Post } = require('../../models');
const auth = require('../Users/auth');

module.exports = (req, res) => {
  const userInfo = auth(req);
  if (!userInfo) {
    return res.status(401).json({ message: '로그인이 필요합니다' });
  } else {
    const { musicArtist, musicTitle, url, place, storyboard } = req.body;

    Post.create({
      musicArtist,
      musicTitle,
      url,
      place,
      storyboard,
    })
      .then((post) => {
        res.status(201).json({ message: '게시물 등록이 완료되었습니다' });
      })
      .catch((err) => {
        return res.status(400).json({ message: '잘못된 요청입니다' });
      });
  }
};
