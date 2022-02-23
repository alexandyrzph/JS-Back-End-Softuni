const { isUser } = require('../middleware/guards');
const { createTrip } = require('../services/tripService');
const errorMapper = require('../util/errorMapper');
const router = require('express').Router();


router.get('/create', isUser(), (req, res) => {
    res.render('create', { title: 'Create Trip Offer', data: {} });
});

router.post('/create', isUser(), async (req, res) => {
    const trip = {
        start: req.body.start,
        end: req.body.end,
        date: req.body.date,
        time: req.body.time,
        carImg: req.body.carImg,
        carBrand: req.body.carBrand,
        seats: req.body.seats,
        price: req.body.price,
        description: req.body.description,
        owner: req.session.user._id,
    };
    try {
        await createTrip(trip);
        res.redirect('/trips');
    } catch (err) {
        const errors = errorMapper(err);
        res.render('create', { title: 'Create Trip Offer', data: trip, errors });
    }
});

module.exports = router;