"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const uuid_1 = require("uuid");
const mocks_1 = require("../mocks");
class UsersService {
    constructor() {
        this.users = [mocks_1.userMock];
    }
    getUsers() {
        return this.users;
    }
    getUser(id) {
        return this.users.find((user) => user.id === id);
    }
    setUsers(users) {
        this.users = users;
    }
    createUser(user) {
        const newUser = Object.assign(Object.assign({}, user), { id: (0, uuid_1.v4)() });
        this.users = [...this.users, newUser];
        return newUser;
    }
    updateUser(id, userToUpdate) {
        const foundUser = this.users.find((user) => id === user.id);
        if (!foundUser) {
            return null;
        }
        const updatedUser = Object.assign(Object.assign({}, foundUser), userToUpdate);
        this.users = this.users.map((user) => {
            if (userToUpdate.id !== user.id) {
                return user;
            }
            return updatedUser;
        });
        return updatedUser;
    }
    deleteUser(id) {
        const foundUser = this.users.find((user) => id === user.id);
        if (!foundUser) {
            return false;
        }
        this.users = this.users.filter((user) => user.id !== id);
        return true;
    }
}
exports.UsersService = UsersService;
exports.default = new UsersService();
//# sourceMappingURL=UsersService.js.map