const User = require('../User');

describe("The User model", () => {
  const goodUser = new User({
    email: 'bman@watchdog.com',
    password: 'starwars',
  });

  it('assigns a default email', () => {
    expect(goodUser.username).toBe('bman');
  });

  it('assigns a default list of accounts', () => {
    expect(goodUser.accounts.length).toBe(0);
  });

  let badUser;
  beforeEach(() => badUser = new User());

  it('throws an error if there is no email', () => {
    badUser.validate(err => {
      expect(err.errors.email.message).toEqual('Path `email` is required.');
    });
  });

  it('throws an error if there is no username', () => {
    badUser.validate(err => {
      expect(err.errors.username.message).toEqual('Path `username` is required.');
    });
  });

  it('throws an error if there is no password', () => {
    badUser.validate(err => {
      expect(err.errors.password.message).toEqual('Path `password` is required.');
    });
  });
});