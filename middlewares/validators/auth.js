const { body } = require('express-validator/check');

exports.register = [
	body('fullname')
		.trim()
		.isLength({ min: 5 })
		.withMessage('Name must not be less than 5 characters'),
	body('email', 'Please provide a valid email address.')
		.isEmail()
		.normalizeEmail(),
	body('password')
		.isString()
		.isLength({ min: 6 })
		.withMessage('Password must not be less than 6 characters')
];
