const Accessory = require('../models/Accessory');
const { accessoryViewModel } = require('./util');

async function createAccessory(accessory) {
    await Accessory.create(accessory);
}

async function getAll() {
    const data = await Accessory.find({})
    return data.map(accessoryViewModel);
}

module.exports = () => (req, res, next) => {
    req.accessory = {
        createAccessory,
        getAll
    };
    next();
}