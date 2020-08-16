const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateNewEduInput(data) {
    let errors = {};

    data.school = !isEmpty(data.school) ? data.school : '';
    data.degree = !isEmpty(data.degree) ? data.degree : '';
    data.from = !isEmpty(data.from) ? data.from : '';
    
    // school
        if (Validator.isEmpty(data.school)) {
        errors.school = 'School name is required';
    }

    //degree
    if (Validator.isEmpty(data.degree)) {
        errors.degree = 'Degree name is required';
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