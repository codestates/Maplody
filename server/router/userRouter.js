const exress = require('express');
const router = exress.Router();
const controllers = require('../controllers/Users');

router.post('/user-login', controllers.login);
router.post('/user-signup', controllers.signup);
router.get('/user-logout', controllers.logout);

module.exports = router;
