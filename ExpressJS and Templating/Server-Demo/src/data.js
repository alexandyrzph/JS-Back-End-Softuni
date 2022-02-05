const fs = require("fs").promises;

async function readFile() {
    return JSON.parse((await fs.readFile('./products.json')).toString());
}

async function getProducts() {
    const data = await readFile();

    return Object
        .entries(data)
        .map(([_id, item]) => Object.assign({}, item, { _id }));
}

async function getProductById(id) {
    return (await readFile())[id];
}

async function createProduct(product) {
    const data = await readFile();

    const id = nextId();
    data[id] = product;

    await fs.writeFile('./products.json', JSON.stringify(data, null, 4));
}

async function updateProduct(id, product) {
    const data = await readFile();
    data[id] = product;
    await fs.writeFile('./products.json', JSON.stringify(data, null, 4));
}

function nextId() {
    return 'xxxxxxxx'.replace(/x/g, () => Math.random() * 16 | 0).toString(16);
}

module.exports = {
    getProducts,
    createProduct,
    getProductById,
    updateProduct
}