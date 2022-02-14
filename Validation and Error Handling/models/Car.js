const { Schema, model, Types: { ObjectId } } = require('mongoose');

const carSchema = new Schema({
    name: { type: String, minlength: [3, 'Car listing name must be at least 3 characters long!'] },
    description: { type: String, default: 'No description.' },
    imgUrl: { type: String, default: 'notFound.png', match: [/^https?:\/\//, 'Img url must be a valid URL'] },
    price: { type: Number, required: true, min: 0 },
    accessories: { type: [ObjectId], default: [], ref: 'Accessory' },
    owner: { type: ObjectId, ref: 'User' }
});

const Car = model('Car', carSchema);

module.exports = Car;