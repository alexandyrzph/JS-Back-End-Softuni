const express = require('express');
const hbs = require('express-handlebars');
const carService = require('./services/cars');

const {about} = require('./controllers/about');
const create = require('./controllers/create');
const {details} = require('./controllers/details');
const {home} = require('./controllers/home');
const {notFound} = require('./controllers/notfound');
const deleteCar = require('./controllers/delete');
const editCar = require('./controllers/edit');

const app = express();

app.engine('hbs', hbs.create({
    extname: '.hbs'
}).engine);

app.set('view engine', '.hbs');

app.use(express.urlencoded({extended: true}));
app.use('/static', express.static('static'));
app.use(carService());

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

app.all('*', notFound);

app.listen(3000, () => console.log('Server started on port 3000!'));