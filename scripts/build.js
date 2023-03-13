import { zipChromiumExt, zipFirefoxExt } from './compress.js';
import replacePopupPath from './replacePath.js';
import generateManifest from './generateManifest.js';

await replacePopupPath();
await generateManifest('chromium');
await zipChromiumExt();
await generateManifest('firefox');
await zipFirefoxExt();



