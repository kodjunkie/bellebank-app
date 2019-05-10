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
exports.postLogin = (req, res, next) => {
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
exports.postRegister = (req, res, next) => {
	//
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
