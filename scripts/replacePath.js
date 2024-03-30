import chalk from 'chalk';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { dirname } from 'dirname-filename-esm';

const logger = console.log;

const __dirname = dirname(import.meta);

export default async function replacePopupPath() {
    const indexPath = path.join(__dirname, '../dist/popup/index.html');
    const optionPath = path.join(__dirname, '../dist/options/index.html');

    try {
        const content = await readFile(indexPath, { encoding: 'utf8' });
        const newData = content.replaceAll('/index.', 'index.');
        await writeFile(indexPath, newData);

        const optionContent = await readFile(optionPath, { encoding: 'utf8' });
        const newOptionData = optionContent.replaceAll('/index.', 'index.');
        await writeFile(optionPath, newOptionData);
        logger(chalk.greenBright('VideoRoll: replace index path success'));
    } catch (err) {
        logger(chalk.red(`VideoRoll: replace index path faild ${err}`));
    }

}
