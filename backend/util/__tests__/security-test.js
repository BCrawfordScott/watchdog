const security = require('../security');

describe('The security util', () => {
  const password = 'starwars';

  it('accepts and calls a callback', done => {
    const cb = jest.fn(() => {
      expect(cb.mock.calls.length).toBe(1);
      done();
    });

    security.securePassword(password, cb);
  });

  it('produces a hash from a given password', done => {
    const cb = hash => {
      expect(password).not.toBe(hash);
      done();
    };

    security.securePassword(password, cb);
  });

  it('produces a different hash when given the same password twice', done => {
    security.securePassword(password, hash1 => {
      security.securePassword(password, hash2 => {
        expect(hash1).not.toBe(hash2);
        done();
      })
    });
  });
});