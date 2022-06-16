import { createWriteStream } from 'fs';

export const write = async (filename) => {
    const stream = createWriteStream(filename);
    stream.write('');
    stream.on('end', () => {
        stream.end();
    });
}
