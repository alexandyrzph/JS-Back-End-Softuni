module.exports = {
    get(req, res) {
        res.render('create', {title: "Create listing"});
    },
    async post(req, res) {
        const car = {
            name: req.body.name,
            description: req.body.description,
            imgUrl: req.body.imgUrl,
            price: Number(req.body.price)
        }
        await req.storage.createCar(car);
        res.redirect('/');
    }
}