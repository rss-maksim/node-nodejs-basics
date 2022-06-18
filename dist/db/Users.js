"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const uuid_1 = require("uuid");
class UsersService {
    constructor() {
        this.users = [];
    }
    getUsers() {
        return this.users;
    }
    setUsers(users) {
        this.users = users;
    }
    createUser(user) {
        this.users = [...this.users, Object.assign(Object.assign({}, user), { id: (0, uuid_1.v4)() })];
    }
    updateUser(userToUpdate) {
        this.users = this.users.map((user) => {
            if (userToUpdate.id !== user.id) {
                return user;
            }
            return Object.assign(Object.assign({}, user), userToUpdate);
        });
    }
    deleteUser(id) {
        this.users = this.users.filter((user) => user.id !== id);
    }
}
exports.UsersService = UsersService;
exports.default = new UsersService();
//# sourceMappingURL=Users.js.map