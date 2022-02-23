const Trip = require('../models/Trip');

async function createTrip(trip) {
    const result = new Trip(trip);
    await result.save();
}

async function getTripById(id) {
    return Trip.findById(id);
}

module.exports = {
    createTrip,
    getTripById,
};