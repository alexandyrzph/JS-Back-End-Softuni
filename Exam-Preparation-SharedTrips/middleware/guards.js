function isUser() {
    return function (req, res, next) {
        if (req.session.user) {
            next();
        } else {
            res.redirect('/login');
        }
    }
} 

function isGuest() {
    return function (req, res, next) {
        if (req.session.user) {
            res.redirect('/login');
        } else {
            next();
        }
    }
}

function isOwner() {
    return function (req, res, next) {
        const userId = req.session.user?._id;
        // TODO change property name to match collection
        if (res.locals.data.owner == userId) {
            next();
        } else {
            res.status(403);
            res.redirect('/login');
        }
    }
}

module.exports = {
    isUser,
    isGuest,
    isOwner
}