module.exports = {
    async details(req, res) {
        const id = req.params.id;
        const car = await req.storage.getById(id);
        

        
        if (req.session.user && req.session.user.id == car.owner) {
            res.locals.isOwner = true;
        }

        if (car) {
            res.render('details', {car, title: `Carbicle - ${car.name}`});
        } else {
            res.redirect('/404');
        }
    }
}