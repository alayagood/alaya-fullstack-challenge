exports.response = function (errors, message = 'Validation failed') {
    const validationResponse = {};
    validationResponse.message = message;
    validationResponse.errors = errors;

    return validationResponse;
}