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
const auth = require('./controllers/auth');


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
        .get(create.get)
        .post(create.post);

    app.route('/delete/:id')
        .get(deleteCar.get)
        .post(deleteCar.post);

    app.route('/edit/:id')
        .get(editCar.get)
        .post(editCar.post);

    app.route('/accessory')
        .get(accessory.get)
        .post(accessory.post);

    app.route('/attach/:id')
        .get(attach.get)
        .post(attach.post);

    app.route('/register')
        .get(auth.registerGet)
        .post(auth.registerPost);

    app.route('/login')
        .get(auth.loginGet)
        .post(auth.loginPost);

    app.get('/logout', auth.logout);

    app.all('*', notFound);

    app.listen(3000, () => console.log('Server started on port 3000!'));
}