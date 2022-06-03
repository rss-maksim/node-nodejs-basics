import { readdir } from 'node:fs/promises';
import url from 'url';
import path from 'path';

import {checkIfExists} from '../common/index.js';

export const list = async () => {
    const dirname = url.fileURLToPath(new URL('.', import.meta.url));
    const directory = path.resolve(dirname, 'files');
    const hasDirectory = await checkIfExists(directory);
    if (!hasDirectory) {
        throw new Error('FS operation failed');
    }

    try {
        const files = await readdir(directory);
        console.log('Files list: \n', files);
    } catch (err) {
        console.error(err);
    }
};

// Uncomment the line below to run `list` function
// await list();
