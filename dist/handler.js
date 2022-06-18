"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const utils_1 = require("./utils");
const constants_1 = require("./constants");
const db_1 = require("./db");
const handler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const [, prefix, resource, id] = req.url.split('/');
    if ((0, utils_1.isPrefixInvalid)(prefix) || (0, utils_1.isResourceInvalid)(resource, constants_1.RESOURCES.users)) {
        (0, utils_1.makeFailureResponse)(res, constants_1.errorResponses.endpointNotExists);
        return;
    }
    try {
        const { method } = req;
        if (method === constants_1.Method.GET) {
            if (id) {
                if (!(0, utils_1.validateId)(id)) {
                    (0, utils_1.makeFailureResponse)(res, constants_1.errorResponses.invalidId, 400);
                    return;
                }
                const user = db_1.UsersService.getUser(id);
                if (user) {
                    (0, utils_1.makeSuccessResponse)(res, user);
                    return;
                }
                else {
                    (0, utils_1.makeFailureResponse)(res, constants_1.errorResponses.notFound);
                    return;
                }
            }
            else {
                const users = db_1.UsersService.getUsers();
                (0, utils_1.makeSuccessResponse)(res, users);
                return;
            }
        }
        else if (method === constants_1.Method.POST) {
            const payload = yield (0, utils_1.parseBody)(req);
            const body = JSON.parse(payload);
            const errors = (0, utils_1.validateUserBody)(body);
            if (Object.keys(errors).length > 0) {
                (0, utils_1.makeFailureResponse)(res, `${JSON.stringify(errors)} ${constants_1.errorResponses.requiredField}`, 400);
                return;
            }
            else {
                const user = db_1.UsersService.createUser(body);
                (0, utils_1.makeSuccessResponse)(res, user, 201);
                return;
            }
        }
        else if (method === constants_1.Method.PUT) {
            if (!(0, utils_1.validateId)(id)) {
                (0, utils_1.makeFailureResponse)(res, constants_1.errorResponses.invalidId, 400);
                return;
            }
            const body = yield (0, utils_1.parseBody)(req);
            const user = db_1.UsersService.updateUser(id, JSON.parse(body));
            if (user) {
                (0, utils_1.makeSuccessResponse)(res, user, 200);
                return;
            }
            else {
                (0, utils_1.makeFailureResponse)(res, constants_1.errorResponses.notFound, 404);
                return;
            }
        }
        else if (method === constants_1.Method.DELETE) {
            if (!(0, utils_1.validateId)(id)) {
                (0, utils_1.makeFailureResponse)(res, constants_1.errorResponses.invalidId, 400);
                return;
            }
            const success = db_1.UsersService.deleteUser(id);
            if (success) {
                (0, utils_1.makeSuccessResponse)(res, undefined, 204);
                return;
            }
            else {
                (0, utils_1.makeFailureResponse)(res, constants_1.errorResponses.notFound, 404);
                return;
            }
        }
    }
    catch (_a) {
        (0, utils_1.makeFailureResponse)(res, constants_1.errorResponses.serverError, 500);
    }
});
exports.handler = handler;
//# sourceMappingURL=handler.js.map