import chalk from 'chalk';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { dirname } from 'dirname-filename-esm';

const logger = console.log;

const __dirname = dirname(import.meta);

export default async function replacePopupPath() {
    const indexPath = path.join(__dirname, '../dist/popup/index.html');

    try {
        const content = await readFile(indexPath, { encoding: 'utf8' });
        const newData = content.replaceAll('/index.', 'index.');
        await writeFile(indexPath, newData);
        logger(chalk.greenBright('VideoRoll: replace popup path success'));
    } catch (err) {
        logger(chalk.red(`VideoRoll: replace popup path faild ${err}`));
    }

}
