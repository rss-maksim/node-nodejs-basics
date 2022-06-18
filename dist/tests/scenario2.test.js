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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const mocks_1 = require("./mocks");
const server_1 = require("../server");
const db_1 = require("../db");
const constants_1 = require("../constants");
const apiUrl = '/api/users';
describe('Users: scenario #2', () => {
    afterAll((done) => {
        server_1.server.close(done);
    });
    it('should create several user, then check them and non existing one', () => __awaiter(void 0, void 0, void 0, function* () {
        const getUsersResponse = yield (0, supertest_1.default)(server_1.server)
            .get(apiUrl)
            .set('Accept', 'application/json');
        expect(getUsersResponse.status).toEqual(200);
        expect(getUsersResponse.body).toHaveLength(db_1.UsersService.getUsers().length);
        // Delete user
        yield (0, supertest_1.default)(server_1.server)
            .delete(`${apiUrl}/${getUsersResponse.body[0].id}`)
            .expect(204);
        // Create user
        const createResponse = yield (0, supertest_1.default)(server_1.server)
            .post(apiUrl)
            .send(mocks_1.userMock)
            .set('Accept', 'application/json')
            .expect(201);
        const createdUserId = createResponse.body.id;
        expect(createResponse.body).toEqual(Object.assign(Object.assign({}, mocks_1.userMock), { id: createdUserId }));
        // Create user
        const createResponse2nd = yield (0, supertest_1.default)(server_1.server)
            .post(apiUrl)
            .send(mocks_1.userMock)
            .set('Accept', 'application/json')
            .expect(201);
        const createdUserId2nd = createResponse2nd.body.id;
        expect(createResponse2nd.body).toEqual(Object.assign(Object.assign({}, mocks_1.userMock), { id: createdUserId2nd }));
        // Get users list
        const getResponse2nd = yield (0, supertest_1.default)(server_1.server)
            .get(apiUrl)
            .set('Accept', 'application/json')
            .expect(200);
        expect(getResponse2nd.body.length).toBe(2);
        // Get non existing user
        const getUserResponse = yield (0, supertest_1.default)(server_1.server)
            .get(`${apiUrl}/6ec0bd7f-11c0-43da-975e-2a8ad9ebae9b`)
            .set('Accept', 'application/json')
            .expect(404);
        expect(getUserResponse.text).toBe(constants_1.errorResponses.notFound);
        // Get user with invalid uuid
        const getUserResponse2nd = yield (0, supertest_1.default)(server_1.server)
            .get(`${apiUrl}/6ec0bd7f`)
            .expect(400);
        expect(getUserResponse2nd.text).toBe(constants_1.errorResponses.invalidId);
    }));
});
//# sourceMappingURL=scenario2.test.js.map