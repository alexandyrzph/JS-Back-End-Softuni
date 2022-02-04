const observer = require('./observer');

function subscribe() {
    observer.on('alert', (data) => {
        console.log('Event received');
        console.log(data);
    });
}
subscribe();