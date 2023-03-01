const chalk = require('chalk');
const fs = require('fs');
const compressing = require('compressing');
const path = require('path');

const logger = console.log;

function replacePopupPath() {
    const indexPath = path.join(__dirname, '../dist/popup/index.html');
    fs.readFile(indexPath, 'utf8', function (err, data) {
        if (err) throw err;

        const newData = data.replaceAll('/index.', 'index.');

        fs.writeFile(indexPath, newData, 'utf8', (err) => {
            if (err) throw err;
            logger(chalk.greenBright('replace popup path success'));
            zipChromiumExt();
        });
    });
}


function replaceServiceWorker() {
    const manifestPath = path.join(__dirname, '../dist/manifest.json');
    fs.readFile(manifestPath, 'utf8', function (err, data) {
        if (err) throw err;

        const json = JSON.parse(data);

        json.background = {
            scripts: [json.background.service_worker]
        };

        const newData = JSON.stringify(json, null, '\t');
        fs.writeFile(manifestPath, newData, 'utf8', (err) => {
            if (err) throw err;
            logger(chalk.greenBright('replace serviceWorker success'));
            zipFirefoxExt();
        });
    });
}

/**
 * zip chromium based extension
 */
function zipChromiumExt() {
    const dir = path.join(__dirname, '../dist/');
    const zip = path.join(__dirname, '../chromiumExt.zip');
    compressing.zip.compressDir(dir, zip, { ignoreBase: true })
        .then((res) => logger(chalk.greenBright('compressing chromiumExt success')))
        .catch((err) => logger(chalk.red('compressing chromiumExt failed\n' + err)));
}

/**
 * zip firefox extension
 */
function zipFirefoxExt() {
    const dir = path.join(__dirname, '../dist/');
    const zip = path.join(__dirname, '../firefoxExt.zip');
    compressing.zip.compressDir(dir, zip, { ignoreBase: true })
        .then((res) => logger(chalk.greenBright('compressing firefoxExt success')))
        .catch((err) => logger(chalk.red('compressing firefoxExt failed\n' + err)));
}

replacePopupPath();
replaceServiceWorker();

