import { createWriteStream } from 'fs';
import url from 'url';
import path from 'path';
import { pipeline } from 'stream';

export const write = async () => {
    const dirname = url.fileURLToPath(new URL('.', import.meta.url));
    const filename = path.resolve(dirname, 'files/fileToWrite.txt');
    const writableStream = createWriteStream(filename);

    pipeline(
        process.stdin,
        writableStream,
        (error) => {
            console.error(error);
        }
    );
};

await write();
