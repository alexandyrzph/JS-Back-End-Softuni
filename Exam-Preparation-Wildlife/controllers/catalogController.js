const { getAllPosts } = require('../services/postService');
const { postViewModel } = require('../util/viewModels');

const router = require('express').Router();

router.get('/catalog', async (req, res) => {
    const posts = (await getAllPosts()).map(postViewModel);

    res.render('catalog', { title: 'Catalog Page', posts });
});


module.exports = router;