import path from 'path';
import { release, version } from 'os';
import { createServer as createServerHttp } from 'http';
import url from 'url';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

import './files/c.js';

const random = Math.random();

let unknownObject;

if (random > 0.5) {
    unknownObject = require('./files/a.json');
} else {
    unknownObject = require('./files/b.json');
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const __filename = url.fileURLToPath(import.meta.url);
console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);
console.log('JSON file imported', unknownObject);

const createMyServer = createServerHttp((_, res) => {
    res.end('Request accepted');
});

export default { unknownObject, createMyServer }

