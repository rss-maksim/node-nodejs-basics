import { promisify } from 'util';
import { pipeline } from 'stream';
import { createUnzip } from 'zlib';
import { createReadStream, createWriteStream } from 'fs';
import url from 'url';
import path from 'path';

const pipe = promisify(pipeline);
const dirname = url.fileURLToPath(new URL('.', import.meta.url));
const sourceFilename = path.resolve(dirname, 'files/archive.gz');
const destinationFilename =  path.resolve(dirname, 'files/decompressedFile.txt');

export const decompress = async () => {
    const gzip = createUnzip();
    const source = createReadStream(sourceFilename);
    const destination = createWriteStream(destinationFilename);
    await pipe(source, gzip, destination);
};

await decompress();
