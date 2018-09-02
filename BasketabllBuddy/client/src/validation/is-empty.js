// The empty validation can be used for whole server
const isEmpty = value =>
    value === undefined ||
    // Check value is undefined
    value === null ||
    // Check value is empty
    (typeof value === 'object' && Object.keys(value).length === 0)||
    (typeof value === 'string' && value.trim().length === 0);

export default isEmpty;