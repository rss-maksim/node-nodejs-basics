import cluster from 'cluster';
import http, {IncomingMessage, ServerResponse} from 'http';
import { cpus } from 'os';
import process from 'process';
import dotenv from 'dotenv';
import {
    isPrefixInvalid,
    isResourceInvalid,
    makeFailureResponse,
    makeSuccessResponse,
    parseBody,
    validateId, validateUserBody
} from "./utils";
import {errorResponses, Method, RESOURCES} from "./constants";
import {User} from "./models";
import {UsersService} from "./db";

import { handler } from './handler';

dotenv.config();

const port = process.env.PORT || 5555;

if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);

    const CPUsNumber = cpus().length;
    for (let i = 0; i < CPUsNumber; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
} else {
    http.createServer(handler).listen(port);

    console.log(`Worker ${process.pid} started`);
}
