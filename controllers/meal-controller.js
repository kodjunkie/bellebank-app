const { validationResult } = require('express-validator/check');
const randomInt = require('random-int');

const render = require('../util/render');
const Order = require('../models/order');

/**
 * GET /meals
 * Meals page
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
exports.getIndex = (req, res, next) => {
	return render('pages/meals', req, res, {
		path: '/meals'
	});
};

/**
 * POST /meals
 * Order a meal
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
exports.postOrder = async (req, res, next) => {
	const inputs = req.body;
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return render('user/dashboard', req, res, {
			validatorErrors: errors.array()
		});
	}

	try {
		const amount = randomInt(100, 500);
		const order = new Order({
			meal: inputs.meal,
			vendor: inputs.vendor,
			user: req.user._id,
			amount: amount
		});

		await order.save();
		req.user.fund -= amount;
		await req.user.save();

		req.flash('success', 'Order placed successfully.');
		return res.redirect('/');
	} catch (err) {
		next(err);
	}
};
