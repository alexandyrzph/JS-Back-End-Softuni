const { getProducts, createProduct, getProductById, updateProduct } = require("../data");
const { loadFragment, render } = require("../view");

module.exports = {
    async catalog(req, res) {
        const products = await getProducts();
        loadFragment('catalog', fragment => {
            const result = fragment.replace(
                '{{{items}}}',
                products.map(p => `<li>${p.name} - ${p.price} <a href="/edit?id=${p._id}">[Edit]</a></li>`).join('\n')
            );
            res.html(render(result, 'Catalog'));
        });
    },
    createGet(req, res) {
        loadFragment('create', fragment => {
            res.html(render(fragment, 'Create Product'));
        })
    },
    createPost(req, res) {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            const formData = body
                .split('&')
                .map(prop => prop.split('='))
                .reduce((r, [k, v]) => Object.assign(r, { [k]: decodeURIComponent(v.split('+').join(' ')) }), {});

            await createProduct({
                name: formData.name,
                price: Number(formData.price)
            });

            res.redirect('/catalog');
        });
    },
    async editGet(req, res) {
        const productId = req.url.searchParams.get('id');
        const product = await getProductById(productId);

        loadFragment('edit', fragment => {
            const result = fragment
                .replace('{{{_id}}}', productId)
                .replace('{{{name}}}', product.name)
                .replace('{{{price}}}', product.price)

            res.html(render(result));
        });
    },
    editPost(req, res) {
        const productId = req.url.searchParams.get('id');
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            const formData = body
                .split('&')
                .map(prop => prop.split('='))
                .reduce((r, [k, v]) => Object.assign(r, { [k]: decodeURIComponent(v.split('+').join(' ')) }), {});

            await updateProduct(productId, {
                name: formData.name,
                price: Number(formData.price)
            });

            res.redirect('/catalog');
        });
    }

}