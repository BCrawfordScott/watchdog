const validText = require('../validText.js');

describe('validText', () => {
  it('returns true if it receives a valid string', () => {
    expect(validText('true')).toBe(true);
  });

  it('returns false if it receives something that is not a string', () => {
    expect(validText(false)).toBe(false);
  });

  it('returns false if the string is empty', () => {
    expect(validText('')).toBe(false);
  });

  it('returns false if there are no valid characters', () => {
    expect(validText('     ')).toBe(false);
  })
})