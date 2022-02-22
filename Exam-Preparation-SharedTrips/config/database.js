const mongoose = require('mongoose');
require('../models/User');


const dbName = 'sharedtrip';

const connectionString = `mongodb://localhost:27017/${dbName}`;

module.exports = async (app) => {
    try {
        await mongoose.connect(connectionString, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });

        console.log('Database connected!');

        mongoose.connection.on('error', (err) => {
            console.error('Database error!', err);
        });
    } catch (err) {
        console.error('Error connecting to the database', err);
        process.exit(1);
    }
}