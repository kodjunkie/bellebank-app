const { body } = require('express-validator/check');

exports.order = [
	body('vendor', 'Vendor is not selected.').trim(),
	body('meal', 'Meal is not selected.').trim()
];
