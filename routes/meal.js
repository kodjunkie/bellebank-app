const express = require('express');

const mealController = require('../controllers/meal-controller');
const validator = require('../middlewares/validators/meal');
const { isAuth } = require('../middlewares/user');

const router = express.Router();

router.get('/', isAuth, mealController.getIndex);

router.post('/', isAuth, validator.order, mealController.postOrder);

module.exports = router;
