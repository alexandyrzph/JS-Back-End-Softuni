const { isUser } = require('../middleware/guards');
const { vote } = require('../services/postService');
const errorMapper = require('../util/errorMapper');

const router = require('express').Router();

router.get('/vote/:id/:type', isUser(), async (req, res) => {
    const id = req.params.id;
    const userId = req.session.user._id;
    const value = req.params.type == 'upvote' ? 1 : -1;

    try {
        await vote(id, userId, value);
        res.redirect('/catalog/details/' + id);
    } catch (err) {
        const errors = errorMapper(err);
        res.render('details', { title: 'Post Details', errors });
    }
});

module.exports = router;