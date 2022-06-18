"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSuccessResponse = void 0;
const makeSuccessResponse = (res, payload, status = 200) => {
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(status);
    res.end(JSON.stringify(payload));
};
exports.makeSuccessResponse = makeSuccessResponse;
//# sourceMappingURL=makeSuccessResponse.js.map