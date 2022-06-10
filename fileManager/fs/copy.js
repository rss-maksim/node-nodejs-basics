import { cp } from 'node:fs/promises';

import { hasFile } from '../common/index.js';

export const copy = async (source, destination,) => {
    const hasSource = await hasFile(source);
    if (!hasSource) {
        throw new Error('FS operation failed');
    }
    const hasDestination = await hasFile(destination);
    if (hasDestination) {
        throw new Error('FS operation failed');
    }
    try {
        await cp(source, destination, { recursive: true });
    } catch(error) {
        console.error(error);
    }
};
