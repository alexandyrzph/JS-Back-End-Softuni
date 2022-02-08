const Accessory = require('../models/Accessory');

function accessoryViewModel(accessory) {
    return {
        id: accessory._id,
        name: accessory.name,
        description: accessory.description,
        imgUrl: accessory.imgUrl,
        price: Number(accessory.price),
    }
}

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