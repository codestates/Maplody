const { Post } = require('../../models');
const { auth } = require('../Users/auth');

module.exports = {
  getAll: async (req, res) => {
    const userInfo = await auth(req);

    Post.findAll({
      where: { userId: userInfo.id },
    })
      .then((postList) => {
        if (!postList) {
          return res.status(400).json({ message: '' });
        }
        return res.status(200).json({ data: postList });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getOne: (req, res) => {
    const userInfo = auth(req);
    if (!userInfo) {
      return res.status(401).json({ message: '로그인이 필요합니다' });
    } else {
      const { id } = req.params;

      Post.findOne({
        where: { id },
      })
        .then((post) => {
          res.status(201).json({ data: post, message: '요청된 게시물입니다' });
        })
        .catch((err) => {
          return res.status(400).json({ message: '잘못된 요청입니다' });
        });
    }
  },
};
