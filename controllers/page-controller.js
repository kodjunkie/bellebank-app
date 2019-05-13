const Order = require('../models/order');
const render = require('../util/render');

/**
 * GET /
 * Landing page
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
exports.getIndex = async (req, res, next) => {
	if (!req.session.isLoggedIn) {
		return render('index', req, res);
	}

	try {
		const orders = await Order.find({ user: req.user._id })
			.sort({ createdAt: -1 })
			.limit(10)
			.lean();

		return render('user/dashboard', req, res, {
			path: '/',
			orders
		});
	} catch (err) {
		next(err);
	}
};
