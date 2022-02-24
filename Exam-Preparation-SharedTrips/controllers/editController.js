const { isOwner } = require('../middleware/guards');
const preload = require('../middleware/preload');
const { updateTrip } = require('../services/tripService');
const errorMapper = require('../util/errorMapper');

const router = require('express').Router();

router.get('/edit/:id', preload(), isOwner(), (req, res) => {
    res.render('edit', { title: 'Edit Page' });
});

router.post('/edit/:id', preload(), isOwner(), async (req, res) => {
    const id = req.params.id;
    const trip = {
        start: req.body.start,
        end: req.body.end,
        date: req.body.date,
        time: req.body.time,
        carImg: req.body.carImg,
        carBrand: req.body.carBrand,
        seats: Number(req.body.seats),
        price: Number(req.body.price),
        description: req.body.description
    };
    try {
        await updateTrip(id, trip);
        res.redirect('/details/' + id);
    } catch (err) {
        console.error(err);
        const errors = errorMapper(err);
        res.render('edit', { title: 'Edit Page', data: trip, errors });
    }

});

module.exports = router;