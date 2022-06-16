import crypto from 'crypto';

import { read } from '../fs/index.js';

export const calculateHash = async (filename) => {
    const content = await read(filename, { binary: true });
    return crypto.createHash('sha256').update(content).digest('hex');
};
