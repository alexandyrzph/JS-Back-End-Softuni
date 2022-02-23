const homeController = require('../controllers/homeController');
const authController = require('../controllers/authController');
const tripController = require('../controllers/tripController');

module.exports = (app) => {
    app.use(homeController);
    app.use(authController);
    app.use(tripController);

    app.get('*', (req, res) => {
        res.render('404', { title: 'Not Found' });
    });
}