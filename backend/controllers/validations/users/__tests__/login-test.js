const validateLogin = require('../login');

describe('validateLogin', () => {
  const goodData = {
    email: 'bman@bman.com',
    password: 'starwars',
  }
  const badData = {
    email: '',
    password: '',
  }

  it('returns an object with a key of "errors"', () => {
    expect(validateLogin(goodData).errors).toBeTruthy();
  });

  it('returns an object with a key of "isValid"', () => {
    expect(validateLogin(goodData).isValid).toBeTruthy();
  });

  it("it does not mutate it's argument", () => {
    const original = Object.assign({}, goodData);
    validateLogin(goodData);
    expect(original).toMatchObject(goodData);
  });

  it('returns no errors and true if the data is valid', () => {
    const result = {
      errors: {},
      isValid: true,
    }
    expect(validateLogin(goodData)).toMatchObject(result);
  });

  it('returns errors and false if the data is invalid', () => {
    const result = {
      errors: {
        email: ['Email field is required.', 'Email is invalid.'],
        password: ['Password field is required.']
      },
      isValid: false,
    }
    const invalid = validateLogin(badData);

    expect(invalid).toMatchObject(result);
  });
  
  it('returns errors and false if the email is invalid', () => {
    const badEmailData = {
      email: 'hello',
      password: 'starwars',
    }
    const result = {
      errors: {
        email: ['Email is invalid.'],
      },
      isValid: false,
    }
    const invalid = validateLogin(badEmailData);

    expect(invalid).toMatchObject(result);
  });
})