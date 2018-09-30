const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validationPost(data) {
    let errors = {};

    data.eventText = !isEmpty(data.eventText) ? data.eventText : '';
    // data.eventTitle = !isEmpty(data.eventTitle) ? data.eventTitle : '';
    // data.eventPeopleNumber = !isEmpty(data.eventPeopleNumber) ? data.eventPeopleNumber : '';
    // data.eventLocation = !isEmpty(data.eventLocation) ? data.eventLocation : '';
    // data.haveBall = !isEmpty(data.haveBall) ? data.haveBall : '';
    // data.eventDate = !isEmpty(data.eventDate) ? data.eventDate : '';

    if(!validator.isLength(data.eventText, {min: 15, max: 300})){
        errors.eventText = 'Text must be at least 15 and 300 characters';
    }

    if(validator.isEmpty(data.eventText)){
        errors.eventText = 'Text field is required';
    }

    // if(validator.isEmpty(data.eventTitle)){
    //     errors.eventTitle = 'Title field is required';
    // }
    //
    //
    // //mark: need be test
    // if(!validator.isInt(data.eventPeopleNumber)){
    //     errors.eventPeopleNumber = 'People number field should be number';
    // }
    // //
    //
    // if(validator.isEmpty(data.eventPeopleNumber)){
    //     errors.eventPeopleNumber = 'People number field is required';
    // }


    //
    // if(validator.isEmpty(data.eventLocation)){
    //     errors.eventLocation = 'Location field is required';
    // }
    //
    // //mark: need be test
    // if(!validator.isBoolean(data.haveBall)){
    //     errors.haveBall = 'HaveBall field should be boolean';
    // }
    // //
    //
    // if(validator.isEmpty(data.haveBall)){
    //     errors.haveBall = 'Ball field is required';
    // }

    // if(validator.isEmpty(data.eventDate)){
    //     errors.eventDate = 'Event start date field is required';
    // }


    return{
        errors,
        isValid: isEmpty(errors)
    };
};