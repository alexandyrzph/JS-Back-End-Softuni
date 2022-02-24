const { isOwner } = require('../middleware/guards');
const preload = require('../middleware/preload');
const { updateTrip, deleteTrip } = require('../services/tripService');
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
        trip._id = id;
        res.render('edit', { title: 'Edit Page', trip, errors });
    }

});

router.get('/delete/:id', preload(), isOwner(), async (req, res) => {
    const id = req.params.id;
    try {
        await deleteTrip(id);
        res.redirect('/trips');
    } catch (err) {
        console.error(err);
        res.redirect('/login');
    }

});

module.exports = router;