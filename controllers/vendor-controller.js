const render = require('../util/render');

/**
 * GET /vendors
 * Vendors page
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
exports.getIndex = (req, res, next) => {
	return render('pages/vendors', req, res, {
		path: '/vendors'
	});
};
