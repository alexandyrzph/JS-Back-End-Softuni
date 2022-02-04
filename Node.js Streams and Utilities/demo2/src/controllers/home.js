const { loadFragment, render } = require("../view");

module.exports = {
    home(req, res) {
        loadFragment('home', (fragment) => {
            const html = render(fragment, 'Home');
            res.html(html);
        })
    }
};