const { isUser } = require('../middleware/guards');
const { deletePostById, getPostById } = require('../services/postService');
const { postViewModel } = require('../util/viewModels');

const router = require('express').Router();

router.get('/delete/:id', isUser(), async (req, res) => {
    const id = req.params.id;
    const existing = postViewModel(await getPostById(id));

    if (req.session.user._id != existing.author._id) {
        return res.redirect('/login');
    }

    try {
        await deletePostById(id);
        res.redirect('/catalog');
    } catch (err) {
        res.redirect('/login');
    }
});

module.exports = router;