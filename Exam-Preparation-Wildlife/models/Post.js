const { Schema, model, Types: { ObjectId } } = require('mongoose');

const URL_PATTERN = /^https?:\/\/(.+)/;

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: [6, 'Title must be at least 6 characters long!']
    },
    keyword: {
        type: String,
        required: true,
        minlength: [6, 'Keyword must be at least 6 characters long']
    },
    location: {
        type: String,
        required: true,
        maxlength: [15, 'Location must be at most 15 characters long']
    },
    date: {
        type: String,
        required: true,
        minlength: [10, 'Date must be 10 characters long'],
        maxlength: [10, 'Date must be 10 characters long'],
    },
    image: {
        type: String,
        validate: {
            validator(value) {
                return URL_PATTERN.test(value);
            },
            message: 'Image must be a valid URL',
        }
    },
    description: {
        type: String,
        minlength: [8, 'Description must be at least 8 characters long!']
    },
    author: { type: ObjectId, ref: 'User', required: true },
    votes: { type: [ObjectId], default: [], ref: 'User' },
    rating: { type: Number, default: 0 }
});

const Post = model('Post', postSchema);

module.exports = Post;