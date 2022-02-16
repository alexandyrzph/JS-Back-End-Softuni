const { isUser } = require('../middleware/guards');
const { createPost } = require('../services/postService');
const errorMapper = require('../util/errorMapper');

const router = require('express').Router();

router.get('/create', isUser(), (req, res) => {
    res.render('create', { title: 'Create Page' });
});

router.post('/create', isUser(), async (req, res) => {
    const userId = req.session.user._id;
    const post = {
        title: req.body.title,
        keyword: req.body.keyword,
        location: req.body.location,
        date: req.body.date,
        image: req.body.image,
        description: req.body.description,
        author: userId,
    };

    try {
        await createPost(post);
        res.redirect('/catalog');
    } catch (err) {
        const errors = errorMapper(err);
        res.render('create', { title: 'Create Page', errors, data: post });
    }
});

module.exports = router;