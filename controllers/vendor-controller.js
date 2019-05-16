const render = require('../util/render');
const { title } = require('../util/page');

/**
 * GET /vendors
 * Vendors page
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
exports.getIndex = (req, res, next) => {
	return render('pages/vendors', req, res, {
		pageTitle: title('Vendors'),
		path: '/vendors'
	});
};
