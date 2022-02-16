const { isGuest, isUser } = require('../middleware/guards');
const { register, login } = require('../services/userService');
const errorMapper = require('../util/errorMapper');

const router = require('express').Router();

router.get('/register', isGuest(), (req, res) => {
    res.render('register', { title: 'Register Page' });
});

//TODO check form action, method, field names
router.post('/register', isGuest(), async (req, res) => {

    try {
        if (req.body.password != req.body.repeatPassword) {
            throw new Error('Passwords don\'t match');
        }
        const user = await register(req.body.firstName, req.body.lastName, req.body.email, req.body.password);
        req.session.user = user;
        res.redirect('/'); //TODO check redirect requirements
    } catch (err) {
        const errors = errorMapper(err);
        const data = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        };

        res.render('register', {
            title: 'Register page',
            data, 
            errors
        });
    }

});

router.get('/login', isGuest(), (req, res) => {
    res.render('login', { title: 'Login Page' });
});

router.post('/login', isGuest(), async (req, res) => {
    try {
        const user = await login(req.body.email, req.body.password);
        if (!user) {
            throw new Error('Incorrect email or password!');
        }
        req.session.user = user;
        res.redirect('/');
    } catch (err) {
        const errors = errorMapper(err);
        res.render('login', {
            title: 'Login Page',
            data: {
                email: req.body.email,
            },
            errors
        });
    }
});

router.get('/logout', isUser(), (req, res) => {
    delete req.session.user;
    //TODO check redirect
    res.redirect('/login');
});

module.exports = router;