import { Transform } from 'node:stream';

const ReverseTransform = new Transform({
    transform(chunk, encoding, callback) {
        callback(chunk.toString().split('').reverse().join(''));
    }
});

export const transform = async () => {
    process.stdin
        .pipe(ReverseTransform)
        .on('error', (error) => console.error(error))
        .pipe(process.stdout);
};

await transform();
