const { isUser } = require('../middleware/guards');
const { getTripByUser } = require('../services/tripService');

const router = require('express').Router();

router.get('/profile', isUser(), async (req, res) => {
    const tripsByUser = await getTripByUser(res.locals.user._id);
    res.locals.user.tripsCount = tripsByUser.length;
    res.locals.user.trips = tripsByUser;
    res.locals.user.isMale = res.locals.user.gender == 'Male';
    res.render('profile', { title: 'Profile Page' });
});

module.exports = router;