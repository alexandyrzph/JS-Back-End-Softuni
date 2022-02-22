function errorMapper(err) {
    if (Array.isArray(err)) {
        return err;

        //Validation error is error thrown by mongoose
    } else if (err.name == 'ValidationError') {
        return Object.values(err.errors).map(e => ({ msg: e.message }));
    } else if (typeof err.name == 'string') {
        return [{ msg: err.message }];
    } else {
        return [{ msg: 'Request error' }];
    }
}

module.exports = errorMapper;