import { promises } from 'node:fs';

import { hasFile } from '../common/index.js';

export const rename = async (oldPath, newPath) => {
    const hasOldFile = await hasFile(oldPath);
    const hasNewFile = await hasFile(newPath);

    if (!hasOldFile || hasNewFile) {
        throw new Error('FS operation failed');
    }

    try {
        await promises.rename(oldPath, newPath);
    } catch (error) {
        console.error(error);
    }
};
