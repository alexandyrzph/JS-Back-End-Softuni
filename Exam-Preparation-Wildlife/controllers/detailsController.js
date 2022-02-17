const router = require('express').Router();
const { getPostById } = require('../services/postService');
const { postViewModel } = require('../util/viewModels');


router.get('/catalog/details/:id', async (req, res) => {
    const id = req.params.id;
    const post = postViewModel(await getPostById(id));

    if (req.session.user) {
        post.hasUser = true;
        if (req.session.user && req.session.user._id == post.author._id) {
            post.isAuthor = true;
        } else {
            post.hasVoted = post.votes.find(v => v._id == req.session.user._id) != undefined;
        }
    }

    res.render('details', { title: 'Details Page', post })
});

module.exports = router;