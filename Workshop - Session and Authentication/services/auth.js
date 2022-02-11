const User = require('../models/User');

async function register(username, password) {
    const user = new User({
        username,
        hashedPassword: password
    });
    await user.save();
}

module.exports = () => (req, res, next) => {
    req.auth = {
        register
    };

    next();
}