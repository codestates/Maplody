const express = require('express');
const router = express.Router();
const controllers = require('../controllers/Users');

router.post('/user-login', controllers.login);
router.post('/user-signup', controllers.signup);
router.get('/user-logout', controllers.logout);
router.delete('/user-withdrawal', controllers.withdrawal);
router.get('/token-auth', controllers.tokenAuth);
router.get('/userinfo', controllers.userinfo.get);
router.put('/userinfo', controllers.userinfo.put);

module.exports = router;
