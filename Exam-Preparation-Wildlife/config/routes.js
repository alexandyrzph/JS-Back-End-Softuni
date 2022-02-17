const authController = require('../controllers/authController');
const homeController = require('../controllers/homeController');
const postController = require('../controllers/postController');
const catalogController = require('../controllers/catalogController');
const detailsController = require('../controllers/detailsController');
const editController = require('../controllers/editController');
const deleteController = require('../controllers/deleteController');
const voteController = require('../controllers/voteController');
const profileController = require('../controllers/profileController');

module.exports = (app) => {
    app.use(homeController);
    app.use(authController);
    app.use(postController);
    app.use(catalogController);
    app.use(detailsController);
    app.use(editController);
    app.use(deleteController);
    app.use(voteController);
    app.use(profileController);
}