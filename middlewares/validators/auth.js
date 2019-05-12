const { body } = require('express-validator/check');
const User = require('../../models/user');

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

exports.login = [
	body('email')
		.isEmail()
		.withMessage('Please provide a valid email address.')
		.custom(value => {
			return User.findOne({ email: value })
				.lean()
				.then(user => {
					if (user) {
						return true;
					}

					return Promise.reject('Your credentials do not match our records.');
				});
		})
		.normalizeEmail(),
	body('password')
		.isString()
		.isLength({ min: 6 })
		.withMessage('Password must not be less than 6 characters')
];
