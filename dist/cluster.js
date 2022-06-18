"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cluster_1 = __importDefault(require("cluster"));
const http_1 = __importDefault(require("http"));
const os_1 = require("os");
const process_1 = __importDefault(require("process"));
const dotenv_1 = __importDefault(require("dotenv"));
const handler_1 = require("./handler");
dotenv_1.default.config();
const port = process_1.default.env.PORT || 5555;
if (cluster_1.default.isPrimary) {
    console.log(`Primary ${process_1.default.pid} is running`);
    const CPUsNumber = (0, os_1.cpus)().length;
    for (let i = 0; i < CPUsNumber; i++) {
        cluster_1.default.fork();
    }
    cluster_1.default.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
}
else {
    http_1.default.createServer(handler_1.handler).listen(port);
    console.log(`Worker ${process_1.default.pid} started`);
}
//# sourceMappingURL=cluster.js.map