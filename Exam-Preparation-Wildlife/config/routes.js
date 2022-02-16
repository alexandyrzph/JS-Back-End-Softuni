const authController = require('../controllers/authController');
const homeController = require('../controllers/homeController');
const postController = require('../controllers/postController');
const catalogController = require('../controllers/catalogController');
const detailsController = require('../controllers/detailsController');

module.exports = (app) => {
    app.use(homeController);
    app.use(authController);
    app.use(postController);
    app.use(catalogController);
    app.use(detailsController);
}