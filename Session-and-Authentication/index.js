const express = require('express');

const app = express();

let visited = 0;

app.get('/', (req, res) => {
    if (req.headers.cookie) {
        res.send(`Welcome to the site! Site visited ${visited} times!`);
        ++visited;
    }
    res.setHeader('Set-Cookie', `visited=${visited}`);
    res.send(`Welcome to the site! You are the first visitor!`);
});

app.listen(3000, () =>console.log('Server started on port 3000!'));