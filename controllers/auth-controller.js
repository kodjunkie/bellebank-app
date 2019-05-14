const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator/check');

const render = require('../util/render');
const User = require('../models/user');

/**
 * GET /auth/login
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
exports.getLogin = (req, res, next) => {
	return render('auth/login', req, res);
};

/**
 * POST /auth/login
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
exports.postLogin = async (req, res, next) => {
	const inputs = req.body;
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return render('auth/login', req, res, {
			validatorErrors: errors.array()
		});
	}

	try {
		const user = await User.findOne({ email: inputs.email }).lean();
		const pwdIsValid = await bcrypt.compare(inputs.password, user.password);

		if (!pwdIsValid) {
			req.flash('error', 'Your credentials do not match our records.');
			return res.redirect('/auth/login');
		}

		req.session.isLoggedIn = true;
		req.session.user = {
			_id: user._id,
			email: user.email
		};
		req.session.save(err => {
			if (err) {
				req.flash('error', "We couldn't sign you in, try again.");
				return res.redirect('/auth/login');
			}

			req.flash('error', `Welcome ${user.name}`);
			res.redirect('/');
		});
	} catch (err) {
		next(err);
	}
};

/**
 * GET /auth/register
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
exports.getRegister = (req, res, next) => {
	return render('auth/register', req, res);
};

/**
 * POST /auth/register
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
exports.postRegister = async (req, res, next) => {
	const inputs = req.body;
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return render('auth/register', req, res, {
			validatorErrors: errors.array()
		});
	}

	try {
		// Generate password hash
		const hashedPwd = await bcrypt.hash(inputs.password, 12);
		if (!hashedPwd) {
			req.flash('error', 'Oops! An error occurred, please try again.');
			return res.redirect('/auth/register');
		}

		const user = new User({
			name: inputs.fullname,
			email: inputs.email,
			password: hashedPwd
		});

		const dbUser = await user.save();
		if (!dbUser) {
			req.flash('error', 'Oops! An error occurred, please try again.');
			return res.redirect('/auth/register');
		}

		req.flash('success', 'Registered successfully.');
		return res.redirect('/auth/login');
	} catch (err) {
		next(err);
	}
};

/**
 * GET /auth/logout
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
exports.getLogout = (req, res, next) => {
	req.session.destroy(err => {
		if (!err) {
			res.redirect('/');
		}
	});
};
