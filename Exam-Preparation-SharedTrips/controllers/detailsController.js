const preload = require('../middleware/preload');
const { getTripById } = require('../services/tripService');

const router = require('express').Router();

router.get('/details/:id', preload(true), (req, res) => {
    if (req.session.user) {
        res.locals.trip.hasUser = true;
        res.locals.trip.isOwner = req.session.user._id == res.locals.trip.owner._id;
    }
    res.render('details', { title: 'Details Page' });
});

module.exports = router;