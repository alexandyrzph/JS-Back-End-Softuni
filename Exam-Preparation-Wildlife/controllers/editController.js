const { isUser } = require('../middleware/guards');
const { getPostById, updatePost } = require('../services/postService');
const errorMapper = require('../util/errorMapper');
const { postViewModel } = require('../util/viewModels');

const router = require('express').Router();

router.get('/edit/:id', isUser(), async (req, res) => {
    const id = req.params.id;
    const post = postViewModel(await getPostById(id));

    if (req.session.user._id != post.author._id) {
        return res.redirect('/login');
    }

    res.render('edit', { title: 'Edit Page', post });
});

router.post('/edit/:id', isUser(), async (req, res) => {
    const id = req.params.id;

    const existing = postViewModel(await getPostById(id));

    if (req.session.user._id != existing.author._id) {
        res.redirect('/login');
    }

    const post = {
        _id: id,
        title: req.body.title,
        keyword: req.body.keyword,
        location: req.body.location,
        date: req.body.date,
        image: req.body.image,
        description: req.body.description,
    };

    try {
        await updatePost(id, post);
        res.redirect(`/catalog/details/${id}`);
    } catch (err) {
        const errors = errorMapper(err);
        res.render('edit', { title: 'Edit Page', post, errors });
    }

});

module.exports = router;