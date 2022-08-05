import request from 'supertest';

import { userMock } from './mocks';
import { server } from '../server';
import { UsersService } from '../db';

const apiUrl = '/api/users';

describe('Users: scenario #1', () => {
    afterAll((done) => {
        server.close(done);
    });

    it('should create a user, remove it and check afterwards', async () => {
        // Get users
        const getUsersResponse = await request(server)
            .get(apiUrl)
            .set('Accept', 'application/json');

        expect(getUsersResponse.status).toEqual(200);
        expect(getUsersResponse.body).toHaveLength(UsersService.getUsers().length);

        // Try to create a user without age
        await request(server)
            .post(apiUrl)
            .send({ ...userMock, age: undefined })
            .set('Accept', 'application/json')
            .expect(400);

        // Create a user
        const createUserResponse = await request(server)
            .post(apiUrl)
            .send(userMock)
            .set('Accept', 'application/json')
            .expect(201);

        const createdUserId = createUserResponse.body.id;
        expect(createUserResponse.body).toEqual({ ...userMock, id: createdUserId });

        // Get the created user
        const getUserResponse = await request(server)
            .get(`${apiUrl}/${createdUserId}`)
            .set('Accept', 'application/json')
            .expect(200);

        expect(getUserResponse.body).toEqual({ ...userMock, id: createdUserId });

        // Update a user
        const updatedUser = {
            ...getUserResponse.body,
            age: 20,
            hobbies: ['playing the guitar', 'playing football']
        }
        const updateUserResponse = await request(server)
            .put(`${apiUrl}/${createdUserId}`)
            .send(updatedUser)
            .set('Accept', 'application/json')
            .expect(200);

        expect(updateUserResponse.body).toEqual(updatedUser);

        // Get a user
        await request(server)
            .delete(`${apiUrl}/${createdUserId}`)
            .expect(204);

        // Delete a user
        await request(server)
            .get(`${apiUrl}/${createdUserId}`)
            .set('Accept', 'application/json')
            .expect(404);
    });
});
