const express = require('express');

const app = express();

const sessions = {};

app.get('/', (req, res) => {
    const cookies = (req.headers.cookie || '')
        .split(';')
        .map(c => c.trim())
        .map(c => c.split('='))
        .reduce((a, [k, v]) => Object.assign(a, { [k]: v }), {});

    console.log('>>>', cookies);

    let user = sessions[cookies.sessionId];

    if (user == undefined) {
        const newId = ('000000' + (Math.random() * 999999).toString(16)).slice(-6);
        user = {
            visited: 1
        };
        sessions[newId] = user;

        res.setHeader('Set-Cookie', `sessionId=${newId}; httpOnly`);
    } else {
        user.visited++;
    }

    res.send(`<p>Hello<p><p>You have visited the page ${user.visited} times</p>`);
});

app.listen(3000, () => console.log('Server started on port 3000!'));