const observer = require('./observer');

function publish(index) {
    console.log('Publish');
    observer.emit('alert', `Publishing event. Published ${index} times`);
}

module.exports = publish;