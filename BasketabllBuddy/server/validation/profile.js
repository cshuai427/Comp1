const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validationProfileInput(data) {
    let errors = {};

    data.nikeName = !isEmpty(data.nikeName) ? data.nikeName : '';
    data.status = !isEmpty(data.status) ? data.status : '';
    data.skills = !isEmpty(data.skills) ? data.skills : '';


    if(!validator.isLength(data.nikeName, { min: 2, max: 40}))
    {
        errors.nikeName = 'Nickname needs to between 2 and 40 characters';
    }

    if(validator.isEmpty(data.nikeName))
    {
        errors.nikeName = 'Profile nikeName is required';
    }

    if(!isEmpty(data.youtube)){
        if(!validator.isURL(data.youtube)){
            errors.youtube = 'Not a valid URL';
        }
    }

    if(!isEmpty(data.twitter)){
        if(!validator.isURL(data.twitter)){
            errors.twitter = 'Not a valid URL';
        }
    }

    if(!isEmpty(data.facebook)){
        if(!validator.isURL(data.facebook)){
            errors.facebook = 'Not a valid URL';
        }
    }

    if(!isEmpty(data.linkedin)){
        if(!validator.isURL(data.linkedin)){
            errors.linkedin = 'Not a valid URL';
        }
    }

    if(!isEmpty(data.instagram)){
        if(!validator.isURL(data.instagram)){
            errors.instagram = 'Not a valid URL';
        }
    }




    return{
        errors,
        isValid: isEmpty(errors)
    };
};