import { createReadStream } from 'fs';

export const read = async (filename, options = {}) => {
    const isBinary = options.binary || false;

    return new Promise((resolve, reject) => {
        const readableStream = createReadStream(filename);
        let content = '';
        let binaryContent;

        readableStream.on('error', (error) => {
            reject(error);
        });

        readableStream.on('data', (chunk) => {
            content += chunk.toString();
            binaryContent += chunk;
        });

        readableStream.on('end', () => {
            resolve(isBinary ? binaryContent : content);
        });
    })
};
