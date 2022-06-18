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
const apiUrl = '/api/users';
describe('Users: scenario #1', () => {
    afterAll((done) => {
        server_1.server.close(done);
    });
    it('should create a user, remove it and check afterwards', () => __awaiter(void 0, void 0, void 0, function* () {
        // Get users
        const getUsersResponse = yield (0, supertest_1.default)(server_1.server)
            .get(apiUrl)
            .set('Accept', 'application/json');
        expect(getUsersResponse.status).toEqual(200);
        expect(getUsersResponse.body).toHaveLength(db_1.UsersService.getUsers().length);
        // Try to create a user without age
        yield (0, supertest_1.default)(server_1.server)
            .post(apiUrl)
            .send(Object.assign(Object.assign({}, mocks_1.userMock), { age: undefined }))
            .set('Accept', 'application/json')
            .expect(400);
        // Create a user
        const createUserResponse = yield (0, supertest_1.default)(server_1.server)
            .post(apiUrl)
            .send(mocks_1.userMock)
            .set('Accept', 'application/json')
            .expect(201);
        const createdUserId = createUserResponse.body.id;
        expect(createUserResponse.body).toEqual(Object.assign(Object.assign({}, mocks_1.userMock), { id: createdUserId }));
        // Get the created user
        const getUserResponse = yield (0, supertest_1.default)(server_1.server)
            .get(`${apiUrl}/${createdUserId}`)
            .set('Accept', 'application/json')
            .expect(200);
        expect(getUserResponse.body).toEqual(Object.assign(Object.assign({}, mocks_1.userMock), { id: createdUserId }));
        // Update a user
        const updatedUser = Object.assign(Object.assign({}, getUserResponse.body), { age: 20, hobbies: ['playing the guitar', 'playing football'] });
        const updateUserResponse = yield (0, supertest_1.default)(server_1.server)
            .put(`${apiUrl}/${createdUserId}`)
            .send(updatedUser)
            .set('Accept', 'application/json')
            .expect(200);
        expect(updateUserResponse.body).toEqual(updatedUser);
        // Get a user
        yield (0, supertest_1.default)(server_1.server)
            .delete(`${apiUrl}/${createdUserId}`)
            .expect(204);
        // Delete a user
        yield (0, supertest_1.default)(server_1.server)
            .get(`${apiUrl}/${createdUserId}`)
            .set('Accept', 'application/json')
            .expect(404);
    }));
});
//# sourceMappingURL=scenario1.test.js.map