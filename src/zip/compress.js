import { promisify } from 'util';
import { pipeline } from 'stream';
import { createGzip } from 'zlib';
import { createReadStream, createWriteStream } from 'fs';
import url from 'url';
import path from 'path';

const pipe = promisify(pipeline);
const dirname = url.fileURLToPath(new URL('.', import.meta.url));
const sourceFilename = path.resolve(dirname, 'files/fileToCompress.txt');
const destinationFilename =  path.resolve(dirname, 'files/archive.gz');

export const compress = async () => {
    const gzip = createGzip();
    const source = createReadStream(sourceFilename);
    const destination = createWriteStream(destinationFilename);
    await pipe(source, gzip, destination);
};

await compress();
