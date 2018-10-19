const validator = require('validator');
const isEmpty = require('./is-empty');

// Validate user profile text field
module.exports = function validationProfileInput(data) {

    let errors = {};
    data.nickName = !isEmpty(data.nickName) ? data.nickName : '';
    data.playerRole = !isEmpty(data.playerRole) ? data.playerRole : '';

    if(!validator.isLength(data.nickName, { min: 2, max: 40}))
    {
        errors.nickName = 'NickName needs to between and 4 characters';
    }

    if(validator.isEmpty(data.nickName))
    {
        errors.nickName = 'Profile nickName is required';
    }

    if(validator.isEmpty(data.playerRole))
    {
        errors.playerRole = 'Profile player role is required';
    }

    if(!validator.isEmpty(data.playerRole) && data.playerRole === '0')
    {
        errors.playerRole = 'Profile player role is required';
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
