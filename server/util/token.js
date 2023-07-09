const jwt = require('jsonwebtoken');

generate = (payload) => {
    return jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '7 days' });
}
validate = (token, callback) => {
    return jwt.verify(token, process.env.JWT_SECRET, callback);
}

decode = (token) => {
    return jwt.decode(token);
}


module.exports = {
    generate,
    validate,
    decode
};