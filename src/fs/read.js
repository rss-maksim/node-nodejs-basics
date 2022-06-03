import { readFile } from 'node:fs/promises';
import url from 'url';
import path from 'path';

import {checkIfExists} from '../common/index.js';

export const read = async () => {
    const dirname = url.fileURLToPath(new URL('.', import.meta.url));
    const filename = path.resolve(dirname, 'files/fileToRead.txt');
    const hasFile = await checkIfExists(filename);

    if (!hasFile) {
        throw new Error('FS operation failed');
    }

    try {
        const content = await readFile(filename);
        console.log(content.toString());
    } catch (error) {
        console.error(error);
    }
};

await read();
