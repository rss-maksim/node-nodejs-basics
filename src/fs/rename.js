import { promises } from 'node:fs';
import url from 'url';
import path from 'path';

import {checkIfExists} from '../common/index.js';

export const rename = async () => {
    const dirname = url.fileURLToPath(new URL('.', import.meta.url));
    const oldFilename = path.resolve(dirname, 'files/wrongFilename.txt');
    const newFilename = path.resolve(dirname, 'files/properFilename.md');

    const hasOldFile = await checkIfExists(oldFilename);
    const hasNewFile = await checkIfExists(newFilename);

    if (!hasOldFile || hasNewFile) {
        throw new Error('FS operation failed');
    }

    try {
        await promises.rename(oldFilename, newFilename);
    } catch (error) {
        console.error(error);
    }
};

// Uncomment the line below to run `rename` function
// await rename();
