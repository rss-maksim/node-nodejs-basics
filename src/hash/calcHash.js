import crypto from 'crypto';
import url from 'url';
import path from 'path';

import { read } from '../fs/read.js';

const dirname = url.fileURLToPath(new URL('.', import.meta.url));
const filename = path.resolve(dirname, 'files/fileToCalculateHashFor.txt');

export const calculateHash = async () => {
    const content = await read(filename);
    return crypto.createHash('sha256').update(content).digest('hex');
};
