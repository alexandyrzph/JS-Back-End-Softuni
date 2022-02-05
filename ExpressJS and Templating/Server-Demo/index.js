const express = require('express');
const hbs = require('express-handlebars');

const homeController = require('./src/home');
const catalogRouter = require('./src/catalog');

const app = express();

// configuring engine to search handlebars files on .hbs extension
app.engine('.hbs', hbs.create({
    // here we set out ext name
    extname: '.hbs'
}).engine);
app.set('view engine', '.hbs');

app.use(express.urlencoded({ extended: true }));

app.use('/content', express.static('static'));

app.get('/', homeController);
app.use('/catalog', catalogRouter);

app.listen(3000, () => console.log('Server listening on port 3000'))