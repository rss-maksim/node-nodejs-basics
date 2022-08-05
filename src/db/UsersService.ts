import { v4 as uuidv4 } from 'uuid';

import { User } from '../models';
import { userMock } from '../mocks';


export class UsersService {
    users: User[];

    constructor() {
        this.users = [userMock];
    }

    getUsers() {
        return this.users;
    }

    getUser(id: string) {
        return this.users.find((user) => user.id === id);
    }

    setUsers(users: User[]) {
        this.users = users;
    }

    createUser(user: Omit<User, 'id'>): User {
        const newUser = { ...user, id: uuidv4() };
        this.users = [...this.users, newUser];
        return newUser;
    }

    updateUser(id: string, userToUpdate: User): User | null {
        const foundUser = this.users.find((user) => id === user.id);
        if (!foundUser) {
            return null;
        }
        const updatedUser = { ...foundUser, ...userToUpdate };
        this.users = this.users.map((user: User) => {
            if (userToUpdate.id !== user.id) {
                return user;
            }
            return updatedUser;
        });
        return updatedUser;
    }

    deleteUser(id: string): boolean {
        const foundUser = this.users.find((user) => id === user.id);
        if (!foundUser) {
            return false;
        }
        this.users = this.users.filter((user) => user.id !== id);
        return true;
    }
}

export default new UsersService();
