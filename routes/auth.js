const express = require('express');
const authConteroller = require('../controllers/auth-controller');

const router = express.Router();

router.get('/login', authConteroller.getLogin);

router.post('/login', authConteroller.postLogin);

router.post('/register', authConteroller.postRegister);

router.get('/register', authConteroller.getRegister);

router.post('/logout', authConteroller.postLogout);

module.exports = router;
