const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, './dist/popup/index.html'), 'utf8', function (err, data) {
    if (err) throw err;

    const newData = data.replaceAll('/index.', 'index.');

    fs.writeFile(path.join(__dirname, './dist/popup/index.html'), newData, 'utf8', (err) => {
        if (err) throw err;
        console.log('replace path success');
    });
});
