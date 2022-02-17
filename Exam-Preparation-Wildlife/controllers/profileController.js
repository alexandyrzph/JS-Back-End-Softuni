const { isUser } = require('../middleware/guards');
const { getPostsByAuthor } = require('../services/postService');
const { postViewModel } = require('../util/viewModels');

const router = require('express').Router();

router.get('/profile', isUser(), async (req, res) => {
    const userId = req.session.user._id;
    const posts = (await getPostsByAuthor(userId)).map(postViewModel);
    res.render('profile', { title: 'Profile page', posts });
});

module.exports = router;