import { IncomingMessage } from 'http';

export const parseBody = async (req: IncomingMessage) => {
    const buffers = [];

    for await (const chunk of req) {
        buffers.push(chunk);
    }

    return Buffer.concat(buffers).toString();
}
