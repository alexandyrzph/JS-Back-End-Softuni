const fs = require('fs');

fs.readFile('./data.json', (err, dataAsText) => {
    const data = JSON.parse(dataAsText);

    data.price++;

    fs.writeFile('./data.json', JSON.stringify(data, null, 4), (err) => {
        console.log('Write complete');
    });
}); 
