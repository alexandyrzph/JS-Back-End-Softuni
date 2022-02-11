module.exports = {
    async details(req, res) {
        const id = req.params.id;
        const car = await req.storage.getById(id);
        
        if (car) {
            res.render('details', {car, title: `Carbicle - ${car.name}`});
        } else {
            res.redirect('/404');
        }
    }
}