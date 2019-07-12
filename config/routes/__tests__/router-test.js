const request = require('supertest');
const router = require('../router');

describe("The Router", () => {
  let server;
  beforeEach(() => {
    const app = require('express')();
    router(app);
    server = app.listen(8000);
  });
  afterEach(() => server.close());

  it('applies the user routes to the app', () => {
    request(server)
      .get('/api/users/test')
      .expect(200)
  });

  it('applies the account routes to the app', () => {
    request(server)
      .get('/api/accounts/test')
      .expect(200)
  });
});