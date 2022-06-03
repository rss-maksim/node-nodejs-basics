import { rm } from 'node:fs/promises';
import url from 'url';
import path from 'path';

import {checkIfExists} from '../common/index.js';

export const remove = async () => {
    const dirname = url.fileURLToPath(new URL('.', import.meta.url));
    const filename = path.resolve(dirname, 'files/fileToRemove.txt');
    const hasFile = await checkIfExists(filename);
    if (!hasFile) {
        throw new Error('FS operation failed');
    }

    try {
        await rm(filename);
    } catch (error) {
        console.error(error);
    }
};

// Uncomment the line below to run `remove` function
// await remove();
