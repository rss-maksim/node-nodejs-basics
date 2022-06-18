"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserBody = void 0;
const validateUserBody = (body) => {
    const errors = {};
    if (!body.username) {
        errors.username = 'required';
    }
    if (isNaN(body.age)) {
        errors.age = 'required';
    }
    if (!Array.isArray(body.hobbies)) {
        errors.hobbies = 'required';
    }
    return errors;
};
exports.validateUserBody = validateUserBody;
//# sourceMappingURL=validateUserBody.js.map