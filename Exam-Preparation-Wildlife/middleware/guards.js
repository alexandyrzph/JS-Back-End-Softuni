function isUser() {
    return function (req, res, next) {
        if (req.session.user) {
            next();
        } else {
            //TODO check redirect
            res.redirect('/login');
        }
    }
}

function isGuest() {
    return function (req, res, next) {
        if (req.session.user) {
            //TODO check redirect
            res.redirect('/login');
        } else {
            next(); 
        }
    }
}

module.exports = {
    isGuest,
    isUser
}