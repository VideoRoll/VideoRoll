import chalk from 'chalk';
import path from 'node:path';
import compressing from 'compressing';
import { dirname } from 'dirname-filename-esm';

const __dirname = dirname(import.meta);

const logger = console.log;

/**
 * zip chromium based extension
 */
export async function zipChromiumExt() {
    const dir = path.join(__dirname, '../dist/');
    const zip = path.join(__dirname, '../chromiumExt.zip');

    try {
        await compressing.zip.compressDir(dir, zip, { ignoreBase: true });
        logger(chalk.greenBright('VideoRoll: compressing chromiumExt success'))
    } catch (err) {
        logger(chalk.red('VideoRoll: compressing chromiumExt failed\n' + err))
    }
}

/**
 * zip firefox extension
 */
export async function zipFirefoxExt() {
    const dir = path.join(__dirname, '../dist/');
    const zip = path.join(__dirname, '../firefoxExt.zip');

    try {
        await compressing.zip.compressDir(dir, zip, { ignoreBase: true });
        logger(chalk.greenBright('VideoRoll: compressing firefoxExt success'))
    } catch (err) {
        logger(chalk.red('VideoRoll: compressing firefoxExt failed\n' + err))
    }
}