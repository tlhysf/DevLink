const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePost(data) {
	let errors = {};

	data.text = !isEmpty(data.text) ? data.text : '';

	if (Validator.isEmpty(data.text)) {
		errors.text = 'You didnt enter any text';
	} else {
		if (!Validator.isLength(data.text, { min: 0, max: 300 })) {
			errors.text = 'Please enter 300 characters or less';
		}
	}

	return {
		errors: errors,
		isValid: isEmpty(errors),
	};
};
