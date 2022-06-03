import { createReadStream } from 'fs';
import url from 'url';
import path from 'path';

export const read = async () => {
    const dirname = url.fileURLToPath(new URL('.', import.meta.url));
    const filename = path.resolve(dirname, 'files/fileToRead.txt');
    const readableStream = createReadStream(filename);

    readableStream.on('error', (error) => {
        console.log(`error: ${error.message}`);
    });

    readableStream.on('data', (chunk) => {
        console.log(chunk.toString());
    });
};

await read();
