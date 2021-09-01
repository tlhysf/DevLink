const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
    let errors = {};

    data.handle = !isEmpty(data.handle) ? data.handle : '';
    data.status = !isEmpty(data.status) ? data.status : '';
    data.skills = !isEmpty(data.skills) ? data.skills : '';
    data.website = !isEmpty(data.website) ? data.website : '';
    data.stackOverFlow = !isEmpty(data.stackOverFlow) ? data.stackOverFlow : '';
    data.linkedIn = !isEmpty(data.linkedIn) ? data.linkedIn : '';
    data.github = !isEmpty(data.github) ? data.github : '';



    //handle
    if (Validator.isEmpty(data.handle)) {
        errors.handle = 'Handle is required';
    } else {
        if (!Validator.isLength(data.handle, { min: 4, max: 30 })) {
            errors.handle = "Handle must be between 4 and 30 characters";
        }
    }

    //Skills
    if (Validator.isEmpty(data.skills)) {
        errors.skills = 'Skills are required';
    }

    //Status
    if (Validator.isEmpty(data.status)) {
        errors.status = 'Status is required';
    }

    if(!Validator.isEmpty(data.website)){
        if(!Validator.isURL(data.website)){
            errors.website = 'Not a valid URL';
        }
    }

    if(!Validator.isEmpty(data.github)){
        if(!Validator.isURL(data.github)){
            errors.github = 'Not a valid URL';
        }
    }

    if(!Validator.isEmpty(data.linkedIn)){
        if(!Validator.isURL(data.linkedIn)){
            errors.linkedIn = 'Not a valid URL';
        }
    }

    if(!Validator.isEmpty(data.stackOverFlow)){
        if(!Validator.isURL(data.stackOverFlow)){
            errors.stackOverFlow = 'Not a valid URL';
        }
    }

    return {
        errors: errors,
        isValid: isEmpty(errors)
    }
}