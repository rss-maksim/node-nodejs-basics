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
const constants_1 = require("../constants");
const apiUrl = '/api/users';
describe('Users: scenario #2', () => {
    afterAll((done) => {
        server_1.server.close(done);
    });
    it('should create several user, then check them and non existing one', () => __awaiter(void 0, void 0, void 0, function* () {
        const createResponse = yield (0, supertest_1.default)(server_1.server)
            .post(apiUrl)
            .send(mocks_1.userMock)
            .set('Accept', 'application/json')
            .expect(201);
        const createdUserId = createResponse.body.id;
        expect(createResponse.body).toEqual(Object.assign(Object.assign({}, mocks_1.userMock), { id: createdUserId }));
        // Update a user
        const updatedUser = Object.assign(Object.assign({}, createResponse.body), { age: 20, name: 'Leonardo', hobbies: ['playing football'] });
        const updateUserResponse = yield (0, supertest_1.default)(server_1.server)
            .put(`${apiUrl}/${createdUserId}`)
            .send(updatedUser)
            .set('Accept', 'application/json')
            .expect(200);
        expect(updateUserResponse.body).toEqual(updatedUser);
        // Delete a user
        yield (0, supertest_1.default)(server_1.server)
            .delete(`${apiUrl}/${createdUserId}`)
            .set('Accept', 'application/json')
            .expect(204);
        // Delete a user again
        yield (0, supertest_1.default)(server_1.server)
            .delete(`${apiUrl}/${createdUserId}`)
            .set('Accept', 'application/json')
            .expect(404);
        // Delete a user with invalid uuid
        yield (0, supertest_1.default)(server_1.server)
            .delete(`${apiUrl}/6ec0bd7f`)
            .set('Accept', 'application/json')
            .expect(400);
        // Update the user after deleting
        const updateUserResponse2nd = yield (0, supertest_1.default)(server_1.server)
            .put(`${apiUrl}/${createdUserId}`)
            .send(updatedUser)
            .set('Accept', 'application/json')
            .expect(404);
        expect(updateUserResponse2nd.text).toBe(constants_1.errorResponses.notFound);
        // Update the user with invalid uuid
        const updateUserResponse3rd = yield (0, supertest_1.default)(server_1.server)
            .put(`${apiUrl}/6ec0bd7f`)
            .send(updatedUser)
            .set('Accept', 'application/json')
            .expect(400);
        expect(updateUserResponse3rd.text).toBe(constants_1.errorResponses.invalidId);
    }));
});
//# sourceMappingURL=scenario3.test.js.map