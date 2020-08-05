const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    //Email
    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email is required';
    } else {
        if (!Validator.isEmail(data.email)) {
            errors.email = "Enter a valid email";
        }
    }

    //Password
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password is required';
    }

    return {
        errors: errors,
        isValid: isEmpty(errors)
    }
}