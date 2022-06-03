import { cp } from 'node:fs/promises';
import * as url from 'url';
import path from 'path';

import {checkIfExists} from '../common/index.js';

export const copy = async () => {
    const dirname = url.fileURLToPath(new URL('.', import.meta.url));
    const filesDir = path.resolve(dirname, 'files');
    const filesCopyDir = path.resolve(dirname, 'files_copy');
    const hasFilesDir = await checkIfExists(filesDir);
    if (!hasFilesDir) {
        throw new Error('FS operation failed');
    }
    const hasFilesCopyDir = await checkIfExists(filesCopyDir);
    if (hasFilesCopyDir) {
        throw new Error('FS operation failed');
    }
    try {
        await cp(filesDir, filesCopyDir, {
            recursive: true
        });
    } catch(error) {
        console.error(error);
    }
};

await copy();
