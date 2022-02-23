// TODO replace with actual service
const tripService = require('../services/tripService');


function preload() {
    return async function (req, res, next) {
        const id = req.params.id;
        const trip = await tripService.getTripById(id);
        res.locals.trip = trip;

        next();
    };
}

module.exports = preload;