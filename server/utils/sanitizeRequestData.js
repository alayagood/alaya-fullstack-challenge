const sanitizeHtml = require('sanitize-html');

/**
 * Iterates through all props of an object and sanitizes their values
 */
module.exports = function(data) {
    for (const property in data) {
        const sanitizedValue = sanitizeHtml(data[property]);
        data[property] = sanitizedValue;
    }
    return data;
}
