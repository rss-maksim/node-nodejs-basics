import request from 'supertest';

import { userMock } from './mocks';
import { server } from '../server';
import {errorResponses} from '../constants';

const apiUrl = '/api/users';

describe('Users: scenario #2', () => {
    afterAll((done) => {
        server.close(done);
    });

    it('should create several user, then check them and non existing one', async () => {
        const createResponse = await request(server)
            .post(apiUrl)
            .send(userMock)
            .set('Accept', 'application/json')
            .expect(201);

        const createdUserId = createResponse.body.id;
        expect(createResponse.body).toEqual({ ...userMock, id: createdUserId });

        // Update a user
        const updatedUser = {
            ...createResponse.body,
            age: 20,
            name: 'Leonardo',
            hobbies: ['playing football']
        }

        const updateUserResponse = await request(server)
            .put(`${apiUrl}/${createdUserId}`)
            .send(updatedUser)
            .set('Accept', 'application/json')
            .expect(200);

        expect(updateUserResponse.body).toEqual(updatedUser);

        // Delete a user
        await request(server)
            .delete(`${apiUrl}/${createdUserId}`)
            .set('Accept', 'application/json')
            .expect(204);

        // Delete a user again
        await request(server)
            .delete(`${apiUrl}/${createdUserId}`)
            .set('Accept', 'application/json')
            .expect(404);

        // Delete a user with invalid uuid
        await request(server)
            .delete(`${apiUrl}/6ec0bd7f`)
            .set('Accept', 'application/json')
            .expect(400);

        // Update the user after deleting
        const updateUserResponse2nd = await request(server)
            .put(`${apiUrl}/${createdUserId}`)
            .send(updatedUser)
            .set('Accept', 'application/json')
            .expect(404);

        expect(updateUserResponse2nd.text).toBe(errorResponses.notFound)

        // Update the user with invalid uuid
        const updateUserResponse3rd = await request(server)
            .put(`${apiUrl}/6ec0bd7f`)
            .send(updatedUser)
            .set('Accept', 'application/json')
            .expect(400);

        expect(updateUserResponse3rd.text).toBe(errorResponses.invalidId)
    });
});
