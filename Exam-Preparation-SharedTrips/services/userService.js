const User = require('../models/User');
const { compare, hash } = require('bcrypt');

async function register(email, password, gender) {
    const existing = await getUserByEmail(email);

    if (existing) {
        throw new Error('Email already used');
    }

    const hashedPassword = await hash(password, 10);
    const user = new User({
        email,
        hashedPassword,
        gender
    });
    await user.save();

    return user;
}

async function login(email, password) {
    const user = await getUserByEmail(email);
    if (!user) {
        throw new Error('User not found');
    }
    const hasMatch = await compare(password, user.hashedPassword);
    if (!hasMatch) {
        throw new Error('Incorrect username or password!');
    }
    return user;
}


async function getUserByEmail(email) {
    const user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });
    return user;
}

module.exports = {
    login,
    register,
}