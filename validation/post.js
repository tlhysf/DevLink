const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePost(data) {
    let errors = {};

    data.text = !isEmpty(data.text) ? data.text : '';
    
    if (Validator.isEmpty(data.text)) {
        errors.text = 'Empty comment is not allowed';
    } else {
        if (!Validator.isLength(data.text, { min:0, max: 300 })) {
            errors.text = "Comment can be 300 characters or less";
        }
    }

    return {
        errors: errors,
        isValid: isEmpty(errors)
    }
}