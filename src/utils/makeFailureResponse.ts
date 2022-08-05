import {ServerResponse} from 'http';

export const makeFailureResponse = (res: ServerResponse, error: string, status = 404) => {
    res.writeHead(status);
    res.end(error);
};
