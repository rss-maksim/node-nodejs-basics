import request from 'supertest';

import { userMock } from './mocks';
import { server } from '../server';
import { UsersService } from '../db';
import {errorResponses} from '../constants';

const apiUrl = '/api/users';

describe('Users: scenario #2', () => {
    afterAll((done) => {
        server.close(done);
    });

    it('should create several user, then check them and non existing one', async () => {
        const getUsersResponse = await request(server)
            .get(apiUrl)
            .set('Accept', 'application/json');

        expect(getUsersResponse.status).toEqual(200);
        expect(getUsersResponse.body).toHaveLength(UsersService.getUsers().length);

        // Delete user
        await request(server)
            .delete(`${apiUrl}/${getUsersResponse.body[0].id}`)
            .expect(204);


        // Create user
        const createResponse = await request(server)
            .post(apiUrl)
            .send(userMock)
            .set('Accept', 'application/json')
            .expect(201);

        const createdUserId = createResponse.body.id;
        expect(createResponse.body).toEqual({ ...userMock, id: createdUserId });

        // Create user
        const createResponse2nd = await request(server)
            .post(apiUrl)
            .send(userMock)
            .set('Accept', 'application/json')
            .expect(201);

        const createdUserId2nd = createResponse2nd.body.id;
        expect(createResponse2nd.body).toEqual({ ...userMock, id: createdUserId2nd });

        // Get users list
        const getResponse2nd = await request(server)
            .get(apiUrl)
            .set('Accept', 'application/json')
            .expect(200);

        expect(getResponse2nd.body.length).toBe(2);

        // Get non existing user
        const getUserResponse = await request(server)
            .get(`${apiUrl}/6ec0bd7f-11c0-43da-975e-2a8ad9ebae9b`)
            .set('Accept', 'application/json')
            .expect(404);

        expect(getUserResponse.text).toBe(errorResponses.notFound);

        // Get user with invalid uuid
        const getUserResponse2nd = await request(server)
            .get(`${apiUrl}/6ec0bd7f`)
            .expect(400);

        expect(getUserResponse2nd.text).toBe(errorResponses.invalidId);
    });
});
