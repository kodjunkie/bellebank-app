const { validationResult } = require('express-validator/check');
const render = require('../util/render');

/**
 * GET /auth/login
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
exports.getLogin = (req, res, next) => {
	res.render('auth/login');
};

/**
 * POST /auth/login
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
exports.postLogin = async (req, res, next) => {
	//
};

/**
 * GET /auth/register
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
exports.getRegister = (req, res, next) => {
	res.render('auth/register');
};

/**
 * POST /auth/resgister
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
exports.postRegister = async (req, res, next) => {
	const imputs = req.body;
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return render('auth/register', req, res, {
			validatorErrors: errors.array()
		});
	}

	try {
	} catch (err) {
		next(err);
	}
};

/**
 * POST /auth/logout
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
exports.postLogout = (req, res, next) => {
	//
};
