import configLoad from '../src/config';
import Server from '../src/server';
import { expect } from 'chai';
import { agent as request } from 'supertest';

const server = new Server();
configLoad();
const app = server.initialize();

const testGetEndpoint = (endpoint: string, type: string) => {
  it(`[GET]: Should get ${endpoint}`, async function () {
    const res = await request(app).get(endpoint);
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an(type);
  });
};

//------------------GET tests--------------//

// Users
testGetEndpoint('/api/users/26', 'object');
testGetEndpoint('/api/users', 'array');

// Albums
testGetEndpoint('/api/albums/12', 'object');
testGetEndpoint('/api/albums', 'array');

// Songs
testGetEndpoint('/api/songs/69', 'object');
testGetEndpoint('/api/songs', 'array');

// Artists
testGetEndpoint('/api/artists/8', 'object');
testGetEndpoint('/api/artists', 'array');

// Lists
testGetEndpoint('/api/lists/12', 'object');
testGetEndpoint('/api/lists', 'array');
testGetEndpoint('/api/listbyuser/4', 'array');
