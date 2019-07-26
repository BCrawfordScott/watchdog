const Account = require('../Account');

describe('The Account Model', () => {
  
  it('throws an error if there is no account name', () => {
    const badAccount = new Account()
    badAccount.validate(err => expect(err.errors.name.message).toEqual('Path `name` is required.'));
  });
});