const validateRegister = require('../register');

describe('validateRegister', () => {
  const goodData = {
    email: 'bman@bman.com',
    username: 'bman',
    password: 'starwars',
    password2: 'starwars',
  }

  it('returns an object with a key of "errors"', () => {
    expect(validateRegister(goodData).errors).toBeTruthy();
  });

  it('returns an object with a key of "isValid"', () => {
    expect(validateRegister(goodData).isValid).toBeTruthy();
  });

  it("it does not mutate it's argument", () => {
    const original = Object.assign({}, goodData);
    validateRegister(goodData);
    expect(original).toMatchObject(goodData);
  });

  it('returns no errors and true if the data is valid', () => {
    const result = {
      errors: {},
      isValid: true,
    }
    expect(validateRegister(goodData)).toMatchObject(result);
  });

  it('returns errors and false if the data is invalid', () => {
    const badData = {
      email: '',
      username: '',
      password: '',
      password2: '   ',
    }
    const result = {
      errors: {
        email: [
          'Email field is required.',
          'Email is invalid.',
        ],
        password: [
          'Password field is required.',
          'Password must be at least 6 characters',
        ],
        password2: [
          'Confirm password field is required.',
        ],
      },
      isValid: false,
    }

    expect(validateRegister(badData)).toMatchObject(result);
  });

  it('returns errors and false if the password do not match', () => {
    const badData = {
      email: 'human@human.com',
      username: '',
      password: 'starwars',
      password2: 'startrek',
    }
    const result = {
      errors: {
        password2: [
          'Password fields must match.',
        ],
      },
      isValid: false,
    }

    expect(validateRegister(badData)).toMatchObject(result);
  });
});