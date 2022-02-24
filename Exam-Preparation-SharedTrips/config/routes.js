const homeController = require('../controllers/homeController');
const authController = require('../controllers/authController');
const tripController = require('../controllers/tripController');
const detailsController = require('../controllers/detailsController');
const editController = require('../controllers/editController');
const joinController = require('../controllers/joinController');

module.exports = (app) => {
    app.use(homeController);
    app.use(authController);
    app.use(tripController);
    app.use(detailsController);
    app.use(editController);
    app.use(joinController);

    app.get('*', (req, res) => {
        res.render('404', { title: 'Not Found' });
    });
}