const {Router} = require("express");
const router = Router();

const authService = require('../services/auth');

router.use(authService());


router.get('/register', (req, res) => {
    res.render('register', {title: 'Register'});
});

router.post('/register ', async (req, res) => {

    if (req.body.username.trim() == '' || req.body.password.trim() == '') {
        return res.redirect('/register');
    }

    if (req.body.password != req.body.repeatPassword) {
        return res.redirect('/register');
    }

    try {
        await req.auth.register(req.body.username, req.body.password);
        res.redirect('/');
    } catch (err) {
        console.error(err.message);
        res.redirect('/register');
    }
});

router.get('/login', (req, res) => {
    res.render('login', {title: 'Login'});
});

router.post('/login', async (req, res) => {
    try {
        await req.auth.login(req.body.username, req.body.password);
        res.redirect('/');
    } catch (err) {
        console.error(err.message);
        res.redirect('/login');
    }
})

router.get('/logout', (req, res) => {
    req.auth.logout(req.session);
    res.redirect('/');
})

module.exports = router;