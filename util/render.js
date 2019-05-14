module.exports = function(view, req, res, params = {}) {
	const flash = req.flash();
	const msg = flash.error ? flash.error : flash.success;
	let success;
	if (flash.error) success = false;
	else success = true;

	const flashObj = {
		message: typeof msg === 'undefined' ? '' : msg[0],
		success: success
	};

	res.render(view, {
		flash: flashObj,
		validatorErrors: [],
		...params
	});
};
