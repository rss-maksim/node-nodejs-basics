"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateId = void 0;
const uuid_1 = require("uuid");
const validateId = (id) => {
    return (0, uuid_1.validate)(id);
};
exports.validateId = validateId;
//# sourceMappingURL=validateId.js.map