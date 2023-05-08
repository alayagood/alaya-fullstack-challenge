const sanitizeHtml = require('sanitize-html');

/**
 * Recursively iterates through all props of an object and sanitizes their values
 */
module.exports = function(data) {
    for (const property in data) {
        if (typeof data[property] === 'object') {
            data[property] = module.exports(data[property]);
        } else {
            const sanitizedValue = sanitizeHtml(data[property]);
            data[property] = sanitizedValue;
        }
    }
    return data;
}
