import { User } from '../models';

type ErrorType = Partial<{[key in keyof Omit<User, 'id'>]: string}>;

export const validateUserBody = (body: Omit<User, 'id'>): ErrorType => {
    const errors: ErrorType = {};
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
}
