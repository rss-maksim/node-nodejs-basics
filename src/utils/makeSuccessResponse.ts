import {ServerResponse} from 'http';

export const makeSuccessResponse = (res: ServerResponse, payload: any, status = 200) => {
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(status);
    res.end(JSON.stringify(payload));
}
