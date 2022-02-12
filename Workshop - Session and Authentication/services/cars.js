const Car = require('../models/Car');
const { carViewModel } = require('./util');

async function getAll(query) {
    const options = {};

    if (query.search) {
        options.name = new RegExp(query.search, 'i');
    }
    if (query.from) {
        options.price = { $gte: Number(query.from) };
    }
    if (query.to) {
        if (!options.price) {
            options.price = {};
        }
        options.price.$lte = Number(query.to);
    }

    const cars = await Car.find(options);
    return cars.map(carViewModel);
}

async function getById(id) {
    const car = await Car.findById(id).populate('accessories');
    return car ? carViewModel(car) : undefined;
}

async function createCar(car) {
    await Car.create(car);
}

async function deleteById(id, ownerId) {
    const car = await Car.findById(id);

    if (car.owner != ownerId) {
        return false;
    }
    await Car.findByIdAndDelete(id);

    return true;
}

async function updateById(id, car, ownerId) {

    const existing = await Car.findById(id);

    if (existing.owner != ownerId) {
        return false;
    }

    existing.name = car.name;
    existing.description = car.description;
    existing.imgUrl = car.imgUrl || undefined;
    existing.price = Number(car.price);
    existing.accessories = car.accessories;

    await existing.save();

    return true;
}

async function attachAccessory(carId, accessoryId, ownerId) {
    const existing = await Car.findById(carId);
    
    if (existing.owner != ownerId) return false;

    existing.accessories.push(accessoryId);
    await existing.save();

    return true;
}

module.exports = () => (req, res, next) => {
    req.storage = {
        getAll,
        getById,
        createCar,
        deleteById,
        updateById,
        attachAccessory
    };
    next();
}