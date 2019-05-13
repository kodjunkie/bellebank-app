const User = require('../models/user');

exports.addAuthUserToRequest = async (req, res, next) => {
	const session = req.session;
	if (!session.isLoggedIn) {
		return next();
	}

	const user = await User.findById(session.user._id);
	req.user = user || {};

	next();
};

exports.isAuth = (req, res, next) => {
	if (!req.session.isLoggedIn) {
		return res.redirect('/auth/login');
	}
	next();
};

exports.isGuest = (req, res, next) => {
	if (req.session.isLoggedIn) {
		return res.redirect('/');
	}
	next();
};
