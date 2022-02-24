const preload = require('../middleware/preload');

const router = require('express').Router();

router.get('/details/:id', preload(true), (req, res) => {
    const trip = res.locals.trip;
    trip.remainingSeats = Number(trip.seats) - Number(trip.buddies.length);

    if (req.session.user) {
        trip.hasUser = true;
        trip.isOwner = req.session.user._id == trip.owner._id;

        if (trip.buddies.some(b => b._id == req.session.user._id)) {
            trip.isJoined = true;
        }

    }
    res.render('details', { title: 'Details Page' });
});

module.exports = router;