const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validationProfileInput(data) {
    let errors = {};

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