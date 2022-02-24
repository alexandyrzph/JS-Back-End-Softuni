const { Schema, model, Types: { ObjectId } } = require('mongoose');

const URL_PATTERN = /^https?:\/\/(.+)/;

const tripSchema = new Schema({
    start: {
        type: String,
        required: true,
        min: [4, 'Starting point must be at least 4 characters long']
    },
    end: {
        type: String,
        required: true,
        min: [4, 'End point must be at least 4 characters long']
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    carImg: {
        type: String,
        required: true,
        validate: {
            validator(value) {
                return URL_PATTERN.test(value);
            },
            message: 'Car image must be a valid URL'
        }
    },
    carBrand: {
        type: String,
        min: [4, 'Car brand must be at least 4 characters long']
    },
    seats: { type: Number, required: true, min: 0, max: 4 },
    price: { type: Number, required: true, min: 1, max: 50 },
    description: {
        type: String,
        required: true,
        min: [10, 'Description must be at least 10 characters long']
    },
    owner: { type: ObjectId, ref: 'User' },
    buddies: { type: [ObjectId], default: [], ref: 'User' },
});

const Trip = model('Trip', tripSchema);

module.exports = Trip;