const express = require('express');

const authController = require('../controllers/auth-controller');
const validator = require('../middlewares/validators/auth');
const { isGuest, isAuth } = require('../middlewares/user');

const router = express.Router();

router.get('/login', isGuest, authController.getLogin);

router.post('/login', isGuest, validator.login, authController.postLogin);

router.post(
	'/register',
	isGuest,
	validator.register,
	authController.postRegister
);

router.get('/register', isGuest, authController.getRegister);

router.get('/logout', isAuth, authController.getLogout);

module.exports = router;
