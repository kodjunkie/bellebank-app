const express = require('express');

const vendorController = require('../controllers/vendor-controller');
const { isAuth } = require('../middlewares/user');

const router = express.Router();

router.get('/', isAuth, vendorController.getIndex);

module.exports = router;
