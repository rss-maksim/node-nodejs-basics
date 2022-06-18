"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeFailureResponse = void 0;
const makeFailureResponse = (res, error, status = 404) => {
    res.writeHead(status);
    res.end(error);
};
exports.makeFailureResponse = makeFailureResponse;
//# sourceMappingURL=makeFailureResponse.js.map