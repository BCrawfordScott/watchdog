const request = require('supertest');

describe('The App', () => {
  let server;

  beforeEach(() => {
    server = require('../app.js');
  });
  afterEach(() => {
    server.close();
  });

  it('respondes to /', () => {
    request(server).get('/').expect(200);
  });
});