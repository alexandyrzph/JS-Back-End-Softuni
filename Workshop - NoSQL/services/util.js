function accessoryViewModel(accessory) {
    return {
        id: accessory._id,
        name: accessory.name,
        description: accessory.description,
        imgUrl: accessory.imgUrl,
        price: Number(accessory.price),
    }
}

function carViewModel(car) {
    const model = {
        id: car._id,
        name: car.name,
        description: car.description,
        imgUrl: car.imgUrl,
        price: car.price,
        accessories: car.accessories
    };

    if (model.accessories.length > 0 && model.accessories[0].name) {
        model.accessories = model.accessories.map(accessoryViewModel);
    }
    
    return model;
}

module.exports = {
    accessoryViewModel,
    carViewModel,
};