const express = require('express');
const router = express.Router();
const controllers = require('../controllers/Users');

router.post('/user-login', controllers.login);
router.post('/user-signup', controllers.signup);
router.get('/user-logout', controllers.logout);
router.delete('/user-withdrawal', controllers.withdrawal);

module.exports = router;
