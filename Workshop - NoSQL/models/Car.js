const { Schema, model } = require('mongoose');

const carSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    imgUrl: { type: String, required: true },
    price: { type: Number, required: true }
});

const Car = model('Car', carSchema);

module.exports = Car;