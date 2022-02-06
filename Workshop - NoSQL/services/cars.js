const fs = require('fs/promises');

const filePath = './services/data.json'

// returns JSON from DB aka data.json
async function read() {
    try {
        const file = await fs.readFile(filePath);
        return JSON.parse(file);
    } catch (err) {
        console.error('Database read error');
        console.error(err);
        process.exit(1);
    }
}

// writes data to db data.json
async function write(data) {
    try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error('Database write error!')
        console.error(err);
        process.exit(1);
    }
}

async function getAll(query) {
    const data = await read();
    let cars = Object
        .entries(data)
        .map(([id, v]) => Object.assign({}, {id}, v));

    if (query.search) {
        cars = cars.filter(c => c.name.toLocaleLowerCase().includes(query.search.toLocaleLowerCase()));
    }
    if (query.from) {
        cars = cars.filter(c => c.price >= Number(query.from));
    }
    if (query.to) {
        cars = cars.filter(c => c.price <= Number(query.to));
    }

    return cars;
}

async function getById(id) {
    const data = await read();
    const car = data[id];
    if (car) {
        return Object.assign({}, {id}, car);
    } else {
        return undefined;
    }
}

async function createCar(car) {
    const cars = await read();
    let id;
    do {
        id = nextId();
    } while (cars.hasOwnProperty(id));

    cars[id] = car;

    await write(cars);
}

async function deleteById(id) {
    const data = await read();
    if (data.hasOwnProperty(id)) {
        delete data[id];
        await write(data);
    } else {
        throw new ReferenceError('No such id in db!');
    }
}

async function updateById(id, car) {
    const data = await read();
    if (data.hasOwnProperty(id)) {
        data[id] = car;
        await write(data);
    } else {
        throw new ReferenceError('No such id in db!');
    }
}

function nextId() {
    return 'xxxxxxxx-xxxx'.replace(/x/g, () => Math.random() * 16 | 0).toString(16);
}

module.exports = () => (req, res, next) => {
    req.storage = {
        getAll,
        getById,
        createCar,
        deleteById,
        updateById
    };
    next();
}