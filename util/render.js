module.exports = function(view, req, res, params = {}) {
	const flash = req.flash();
	const msg = flash.error ? flash.error : flash.success;
	const success = !flash.error;

	res.render(view, {
		flash: { message: msg, success: success },
		validatorErrors: [],
		...params
	});
};
