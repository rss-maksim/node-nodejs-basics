import { rm } from 'node:fs/promises';

import { hasFile } from '../common/index.js';

export const remove = async (path) => {
    const hasFilename = await hasFile(path);
    if (!hasFilename) {
        throw new Error('FS operation failed');
    }

    try {
        await rm(path, { recursive: true });
    } catch (error) {
        console.error(error);
    }
};
