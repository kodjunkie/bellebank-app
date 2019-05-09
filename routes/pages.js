const express = require('express');
const pageConteroller = require('../controllers/page-controller');

const router = express.Router();

router.get('/', pageConteroller.getIndex);

module.exports = router;
