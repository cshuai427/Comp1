const validator = require('validator');
const isEmpty = require('./is-empty');

// validate user comment
module.exports = function validationPostComment(data) {

    let errors = {};
    data.text = !isEmpty(data.text) ? data.text : '';

    //return err message if user input is less than 15 or more than 300 characters
    if(!validator.isLength(data.text, {min: 15, max: 300})){
        errors.text = 'Text must be at least 15 and 300 characters';
    }

    //return err message if user input is null
    if(validator.isEmpty(data.text)){
        errors.text = 'Text field is required';
    }

    return{
        errors,
        isValid: isEmpty(errors)
    };
};
