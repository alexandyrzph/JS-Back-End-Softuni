const { Schema, model, Types: { ObjectId } } = require('mongoose');

// const URL_PATTERN = /^https?:\/\/(.+)/;

const tripSchema = new Schema({
    start: {
        type: String,
        required: true,
    },
    end: {
        type: String,
        required: true,
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
        required: true
    },
    carBrand: {
        type: String,
    },
    seats: { type: Number, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    owner: { type: ObjectId, ref: 'User' },
    buddies: { type: [ObjectId], default: [], ref: 'User' },
});

const Trip = model('Trip', tripSchema);

module.exports = Trip;