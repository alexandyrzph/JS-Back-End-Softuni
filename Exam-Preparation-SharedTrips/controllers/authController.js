const { register } = require('../services/userService');

const router = require('express').Router();

router.get('/register', (req, res) => {
    res.render('register', { title: 'Register Page' });
});

router.post('/register', async (req, res) => {
    try {
        console.log(req.body);
        // await register(req.body.email, req.body.password, req.body.gender);
        res.redirect('/');
    } catch (err) {
        console.error(err);
    }

});

router.get('/login', (req, res) => {
    res.render('login', { title: 'Login Page' });
});





module.exports = router;