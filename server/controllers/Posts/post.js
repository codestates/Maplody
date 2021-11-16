const { Post } = require('../../models');
const { auth } = require('../Users/auth');

module.exports = async (req, res) => {
  const userInfo = await auth(req);

  console.log('9', userInfo);
  if (!userInfo) {
    return res.status(401).json({ message: '로그인이 필요합니다' });
  } else {
    const userId = userInfo.id;
    console.log(userId);
    const { musicArtist, musicTitle, url, getAddress, storyBoard, lat, lng } = req.body;
    console.log(url, '!!!!!!!!!!!!!!!!!!!!!!!!');
    const newPost = await Post.create({
      musicArtist: musicArtist,
      musicTitle: musicTitle,
      url: url,
      getAddress: getAddress,
      storyBoard: storyBoard,
      userId: userId,
      lat: lat,
      lng: lng,
    });
    if (!newPost) {
      return res.status(400).json({ message: '잘못된 요청입니다' });
    }
    res.status(201).json({ message: '게시물 등록이 완료되었습니다' });
  }
};
