const {
  registerUser,
  loginUser,
} = require('../authenticity');

jest.mock('../../models/User.js');

describe('Authenticity', () => {
  let req;
  let res;

  beforeEach(() => {
    res = {
      status: function () { return this },
      json: function (message) { this.json = JSON.stringify(message) },
    };
    req = {
      body: {},
    };
  })
  
  describe('registerUser', () => {

    describe('after finding an existing user', () => {
      it('returns json with an error', () => {
        registerUser({}, req, res)
        expect(res.json).toBe("{\"email\":\"That email is not available\"}")
      });
    });
  });
});