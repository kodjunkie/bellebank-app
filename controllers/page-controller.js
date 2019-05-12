const render = require('../util/render');

/**
 * GET /
 * Landing page
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
exports.getIndex = (req, res, next) => {
	if (!req.session.isLoggedIn) {
		return render('index', req, res);
	}

	res.render('user/dashboard');
};
