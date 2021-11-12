const { posts } = require('../../models');

module.exports = {
  post: async (req, res) => {
    const { content, song_artist, song_title, song_image, song_location } = req.body;
    // 토큰 부분 검증후 이상이 없으면 포스트를 전달하고 생성해야한다.
    // 우리 토큰은 req.headers.["authorization"] 의 [1]에 담겨져있다. 0번째는 bearer임
    if (/*토큰이 이상하다*/ !token) {
      return res.status(401).json({ message: '로그인이 필요합니다' });
    }
    const createPost = await posts.create({
      song_artist,
      song_title,
      song_image,
      song_location,
      content,
    });

    if (!createPost) return res.status(400).json('잘못된 요청입니다.');
    res.status(201).json({ data: createPost, message: '게시물 등록이 완료되었습니다.' });
  },
  // put: async (req, res) => {
  //   await posts.update(
  //     { content },
  //     {
  //       where: {
  //         /*조건은 뭐로하지 */
  //       },
  //     },
  //   );
  // },
  //get: (req, res) => {},
};
