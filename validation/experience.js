const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateNewExpInput(data) {
    let errors = {};

    data.title = !isEmpty(data.title) ? data.title : '';
    data.company = !isEmpty(data.company) ? data.company : '';
    data.from = !isEmpty(data.from) ? data.from : '';

    //title
    if (Validator.isEmpty(data.title)) {
        errors.title = 'Job title is required';
    }

    //company
    if (Validator.isEmpty(data.company)) {
        errors.company = 'Company name is required';
    }

    //from
    if (Validator.isEmpty(data.from)) {
        errors.from = 'Start date is required';
    }

    return {
        errors: errors,
        isValid: isEmpty(errors)
    }
}