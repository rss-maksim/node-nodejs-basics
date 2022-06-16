import { promisify } from 'util';
import { pipeline } from 'stream';
import { createBrotliCompress } from 'zlib';
import { createReadStream, createWriteStream } from 'fs';

export const compress = async (source, destination) => {
    const pipe = promisify(pipeline);
    const gzip = createBrotliCompress();
    const sourceStream = createReadStream(source);
    const destinationStream = createWriteStream(destination);
    await pipe(sourceStream, gzip, destinationStream);
};
