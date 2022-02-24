const { isUser } = require('../middleware/guards');
const { joinTrip } = require('../services/tripService');

const router = require('express').Router();

router.get('/join/:id', isUser(), async (req, res) => {
    const userId = req.session.user._id;
    const tripId = req.params.id;
    try {
        await joinTrip(tripId, userId);
    } catch (err) {
        console.error(err);
    } finally {
        res.redirect(`/details/${tripId}`);
    }

});

module.exports = router;