const readEnv = (key) => {
    const val = process.env[key];
    if (val === undefined) {
        throw Error(`${key} must be set`);
    }
    return val;
};

module.exports = {
    readEnv
}
