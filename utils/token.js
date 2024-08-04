const JsonWebToken = require("jsonwebtoken");


const generateToken = (payload) => {
    return JsonWebToken.sign(payload, process.env.JWT_SECRET);
}

module.exports = {
    generateToken
};