/**
 * GET /
 * Landing page
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
exports.getIndex = (req, res, next) => {
	res.render('user/dashboard');
};
