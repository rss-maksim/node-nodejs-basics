import dotenv from 'dotenv';
import http from 'http';

import { handler } from './handler';

dotenv.config();

const port = process.env.PORT || 5555;

export const server = http.createServer(handler);

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
