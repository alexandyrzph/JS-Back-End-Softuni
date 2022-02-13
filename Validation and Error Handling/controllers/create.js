module.exports = {
    get(req, res) {
        res.render('create', { title: "Create listing" });
    },
    async post(req, res) {
        const car = {
            name: req.body.name,
            description: req.body.description,
            imgUrl: req.body.imgUrl || undefined,
            price: Number(req.body.price),
            owner: req.session.user.id
        }
        
        try {
            await req.storage.createCar(car);
            res.redirect('/');
        } catch (err) {
            console.log('Error creating listing.', err);
            res.redirect('/create');
        }
    }
}