const mongoose = require('mongoose');
require('../models/User');


//TODO change db name
const dbName = 'wildlife';
const connectionString = `mongodb://localhost:27017/${dbName}`;

module.exports = async (app) => {

    try {
        await mongoose.connect(connectionString, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });

        console.log('Database connected successfully');

        mongoose.connection.on('error', (err) => {
            console.error('Database error!', err);
        });
    } catch (err) {
        console.error('Error connecting to database');
        process.exit(1);
    }

}