module.exports = () => (req, res, next) => {
    if (req.session.user) {
        res.locals = req.session.user;
        res.locals.hasUser = true;
    }
    next();
}