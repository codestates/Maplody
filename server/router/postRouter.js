const express = require('express');
const router = express.Router();
const controllers = require('../controllers/Posts');

router.post('/', controllers.post);
router.get('/', controllers.get.getAll);
router.get('/:postid', controllers.get.getOne);
router.put('/:postid', controllers.put);
router.delete('/:postid', controllers.delete);

module.exports = router;
