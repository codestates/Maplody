const express = require('express');
const router = express.Router();
const controllers = require('../controllers/Posts');

router.post('/post', controllers.post);
router.get('/:postid', controllers.get);
router.put('/:postid', controllers.put);
router.delete('/:postid', controllers.delete);

module.exports = router;

// Post.findAll({
//       include: [
//         {
//           model: User,
//           attributes: ['id'],
//         },
//       ],
//       where: { userId: userInfo.id },
//     }).then((PostList) => {
//       if (PostList.length === 0) return;
//       return Post.destroy({ where: { userId: {$in: PostList.userId }});
//     })
