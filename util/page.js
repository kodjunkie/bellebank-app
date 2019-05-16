/**
 * Format page title
 * @param  {} title
 */
exports.title = title => {
	return title + ' | ' + process.env.APP_NAME;
};
