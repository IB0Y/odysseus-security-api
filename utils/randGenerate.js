const crypto = require('crypto');

const randGenerate = (length) => crypto.randomBytes(32).toString('hex');

module.exports = {
    randGenerate
};