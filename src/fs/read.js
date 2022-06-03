import {readFile} from 'node:fs/promises';
import url from 'url';
import path from 'path';

import {checkIfExists} from '../common/index.js';

const dirname = url.fileURLToPath(new URL('.', import.meta.url));
const filenamePath = path.resolve(dirname, 'files/fileToRead.txt');

export const read = async (filename = filenamePath) => {
    const hasFile = await checkIfExists(filename);

    if (!hasFile) {
        throw new Error('FS operation failed');
    }

    try {
        return await readFile(filename);
    } catch (error) {
        console.error(error);
    }
};
