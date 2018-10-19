//the empty validation can be used for whole server
const isEmpty = value =>
    value === undefined ||
    //check if value is undefined
    value === null ||
    //check if value is empty
    (typeof value === 'object' && Object.keys(value).length === 0)||
    (typeof value === 'string' && value.trim().length === 0);

module.exports = isEmpty;
