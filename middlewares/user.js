const User = require('../models/user');

exports.addToRequest = async (req, res, next) => {
	const session = req.session;
	if (!session.isLoggedIn) {
		return next();
	}
	const userSessionData = session.user;
	const user = await User.findById(userSessionData._id);
	req.user = user || {};

	next();
};
