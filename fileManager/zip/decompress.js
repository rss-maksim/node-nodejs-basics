import { promisify } from 'util';
import { pipeline } from 'stream';
import { createBrotliDecompress } from 'zlib';
import { createReadStream, createWriteStream } from 'fs';

export const decompress = async (source, destination) => {
    const pipe = promisify(pipeline);
    const gzip = createBrotliDecompress();
    const sourceStream = createReadStream(source);
    const destinationStream = createWriteStream(destination);
    await pipe(sourceStream, gzip, destinationStream);
};
