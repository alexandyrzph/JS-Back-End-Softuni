const express = require('express');
const hbs = require('express-handlebars');
const initDb = require('./models/index');
const session = require('express-session');

const carService = require('./services/cars');
const accessoryService = require('./services/accessory');
const authService = require('./services/auth');

const { about } = require('./controllers/about');
const { details } = require('./controllers/details');
const { home } = require('./controllers/home');
const { notFound } = require('./controllers/notfound');
const create = require('./controllers/create');
const deleteCar = require('./controllers/delete');
const editCar = require('./controllers/edit');
const accessory = require('./controllers/accessory');
const attach = require('./controllers/attach');
const authController = require('./controllers/auth');
const { isLogged } = require('./services/util');

start();

async function start() {
    await initDb();
    const app = express();

    app.engine('hbs', hbs.create({
        extname: '.hbs'
    }).engine);

    app.set('view engine', '.hbs');

    app.use(session({
        secret: 'my secret',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: 'auto' }
    }));
    app.use(express.urlencoded({ extended: true }));
    app.use('/static', express.static('static'));
    app.use(carService());
    app.use(accessoryService());
    app.use(authService());

    app.get('/', home);
    app.get('/about', about);
    app.get('/details/:id', details);

    app.route('/create')
        .get(isLogged(), create.get)
        .post(isLogged(), create.post);

    app.route('/delete/:id')
        .get(isLogged(), deleteCar.get)
        .post(isLogged(), deleteCar.post);

    app.route('/edit/:id')
        .get(isLogged(), editCar.get)
        .post(isLogged(), editCar.post);

    app.route('/accessory')
        .get(isLogged(), accessory.get)
        .post(isLogged(), accessory.post);

    app.route('/attach/:id')
        .get(isLogged(), attach.get)
        .post(isLogged(), attach.post);

    app.use(authController);

    app.all('*', notFound);

    app.listen(3000, () => console.log('Server started on port 3000!'));
}