const validator = require('validator');
const isEmpty = require('./is-empty');

// Validate user post field
module.exports = function validationPost(data) {

    let errors = {};
    data.eventText = !isEmpty(data.eventText) ? data.eventText : '';
    data.eventTitle = !isEmpty(data.eventTitle) ? data.eventTitle : '';
    data.eventPeopleNumber = !isEmpty(data.eventPeopleNumber) ? data.eventPeopleNumber : '';
    data.eventLocation = !isEmpty(data.eventLocation) ? data.eventLocation : '';
    data.haveBall = !isEmpty(data.haveBall) ? data.haveBall : '';
    data.eventDate = !isEmpty(data.eventDate) ? data.eventDate : '';

    if(!validator.isLength(data.eventText, {min: 15, max: 300})){
        errors.eventText = 'Text must be at least 15 and 300 characters';
    }

    if(validator.isEmpty(data.eventText)){
        errors.eventText = 'Text field is required';
    }

    if(validator.isEmpty(data.eventTitle)){
        errors.eventTitle = 'Title field is required';
    }

    if(!validator.isInt(data.eventPeopleNumber)){
        errors.eventPeopleNumber = 'People number field should be number';
    }

    if(validator.isEmpty(data.eventPeopleNumber)){
        errors.eventPeopleNumber = 'People number field is required';
    }

    if(validator.isEmpty(data.eventLocation)){
        errors.eventLocation = 'Location field is required';
    }

    if(!validator.isBoolean(data.haveBall)){
        errors.haveBall = 'HaveBall field should be boolean';
    }

    if(validator.isEmpty(data.haveBall)){
        errors.haveBall = 'Ball field is required';
    }

    if(validator.toDate(data.eventDate) === null){
        errors.eventDate = 'This is not a date'
    }

    if(!isEmpty(data.photo)){
        if(!validator.isURL(data.photo)){
            errors.photo = 'Not a valid URL, Plase make sure your url end with (.jpg/.png ,etc)';
        }
    }

    return{
        errors,
        isValid: isEmpty(errors)
    };
};
