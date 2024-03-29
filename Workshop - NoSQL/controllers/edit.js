module.exports = {
    async get(req, res) {
        const id = req.params.id;
        const car = await req.storage.getById(id);

        if (car) {
            res.render('edit', {title: `Editting car - ${car.name}`, car});
        } else {
            res.redirect('404');
        }
    },
    async post(req, res) {
        const id = req.params.id;
        const car = {
            name: req.body.name,
            description: req.body.description,
            imgUrl: req.body.imgUrl,
            price: Number(req.body.price)
        }
        try {
            await req.storage.updateById(id, car);
            res.redirect('/');
        } catch (err) {
            res.redirect('404');
        }
    }
}