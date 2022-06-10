import { lstat } from 'node:fs/promises';

export const isDirectory = async (path) => {
    try {
        const stat = await lstat(path);
        return stat.isDirectory();
    } catch (error) {
        return false;
    }
};
