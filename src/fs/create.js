import { promises } from 'fs';
import * as url from 'url';
import path from 'path';

import {checkIfExists} from '../common/index.js';

export const create = async () => {
    const dirname = url.fileURLToPath(new URL('.', import.meta.url));
    const filename = path.resolve(dirname, 'files/fresh.txt');
    const hasFile = await checkIfExists(filename);
    if (hasFile) {
        throw new Error('FS operation failed');
    }
    try {
        await promises.writeFile(filename, 'I am fresh and young');
    } catch (error) {
        console.error(error);
    }
};

// Uncomment the line below to run `create` function
// await create();
