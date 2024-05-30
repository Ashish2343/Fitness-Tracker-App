const {Router} = require('express');
const {registerUser, loginuser} = require('../controllers/user.controllers.js');

const router = Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginuser);

module.exports = router;
