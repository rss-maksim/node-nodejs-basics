import dotenv from 'dotenv';
import http, { IncomingMessage, ServerResponse } from 'http';

import { errorResponses, Method, RESOURCES } from './constants';
import {
    isPrefixInvalid,
    isResourceInvalid,
    makeFailureResponse,
    makeSuccessResponse,
    parseBody,
    validateId, validateUserBody
} from './utils';
import { UsersService } from './db';
import { User } from './models';

dotenv.config();

const port = process.env.PORT || 5555;

const requestListener = async (req: IncomingMessage, res: ServerResponse) => {
    const [, prefix, resource, id] = req.url.split('/');
    if (isPrefixInvalid(prefix) || isResourceInvalid(resource, RESOURCES.users)) {
        makeFailureResponse(res, errorResponses.endpointNotExists);
    }

    try {
        const { method } = req;
        if (method === Method.GET) {
            if (id) {
                if (!validateId(id)) {
                    makeFailureResponse(res, errorResponses.invalidId, 400);
                    return;
                }
                const user: User = UsersService.getUser(id);
                if (user) {
                    makeSuccessResponse(res, user);
                    return;
                } else {
                    makeFailureResponse(res, errorResponses.notFound);
                    return;
                }
            } else {
                const users: User[] = UsersService.getUsers();
                makeSuccessResponse(res, users);
                return;
            }
        } else if (method === Method.POST) {
            const payload = await parseBody(req);
            const body = JSON.parse(payload)
            const errors = validateUserBody(body);
            if (Object.keys(errors).length > 0) {
                makeFailureResponse(res, `${JSON.stringify(errors)} ${errorResponses.requiredField}`, 400);
                return;
            } else {
                const user = UsersService.createUser(body);
                makeSuccessResponse(res, user, 201);
                return;
            }
        } else if (method === Method.PUT) {
            if (!validateId(id)) {
                makeFailureResponse(res, errorResponses.invalidId, 400);
                return;
            }
            const body = await parseBody(req);
            const user = UsersService.updateUser(id, JSON.parse(body));
            if (user) {
                makeSuccessResponse(res, user, 200);
            } else {
                makeFailureResponse(res, errorResponses.notFound, 404);
            }
            return;
        } else if (method === Method.DELETE) {
            if (!validateId(id)) {
                makeFailureResponse(res, errorResponses.invalidId, 400);
                return;
            }
            const success = UsersService.deleteUser(id);
            if (success) {
                makeSuccessResponse(res, undefined, 204);
            } else {
                makeFailureResponse(res, errorResponses.notFound, 404);
            }
            return;
        }
    } catch {
        makeFailureResponse(res, errorResponses.serverError, 500);
    }
}

const server = http.createServer(requestListener);

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
