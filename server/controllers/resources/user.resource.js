exports.response = function (user) {
    const response = {};
    response.id = user._id;
    response.name = user.name;
    response.email = user.email;

    return response;
}