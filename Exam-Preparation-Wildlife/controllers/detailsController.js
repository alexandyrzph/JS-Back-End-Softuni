const router = require('express').Router();
const { getPostById } = require('../services/postService');
const { postViewModel } = require('../util/viewModels');


router.get('/catalog/details/:id', async (req, res) => {
    const id = req.params.id;
    const post = postViewModel(await getPostById(id));
    console.log(post);
    res.render('details', { title: 'Details Page', post })
});

module.exports = router;