const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.name       = !isEmpty(data.name)       ? data.name: '';
    data.email      = !isEmpty(data.email)      ? data.email: '';
    data.password   = !isEmpty(data.password)   ? data.password: '';
    data.password2  = !isEmpty(data.password2)  ? data.password2: '';

    //Name
    if(Validator.isEmpty(data.name)){
        errors.name = 'Name is required';
    } else { 
        if(!Validator.isLength(data.name, { min: 2, max: 30 })) {
            errors.name = "Name must be between 2 and 30 characters";
        }
    }
    
    //Email
    if(Validator.isEmpty(data.email)){
        errors.email = 'Email is required';
    } else {
        if(!Validator.isEmail(data.email)){
            errors.email = "Enter a valid email";
        }
    }

    //Password
    if(Validator.isEmpty(data.password)){
        errors.password = 'Password is required';
    } else {
        if(!Validator.isLength(data.password, { min: 6, max: 30 })) {
            errors.password = "Password must be between 6 and 30 characters";
        } else {
            if(Validator.equals(data.password, data.name)){
                errors.password = "Password cannot be the same as name"
            }
        }
    }

    //Confirm Password
    if(Validator.isEmpty(data.password2)){
        errors.password2 = 'Confirm password is required';
    } else {
        if(!Validator.equals(data.password, data.password2)){
            errors.password2 = "Passwords must match"
        }
    }
    
    return {
        errors: errors,
        isValid: isEmpty(errors)
    }
}