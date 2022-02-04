const observer = require('./observer');

function subscribe() {
    observer.on('alert', (data) => {
        console.log('Inside second subscriber');
        console.log(data);
    });
}
subscribe();