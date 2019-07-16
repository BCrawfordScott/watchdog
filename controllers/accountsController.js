const { Types: { ObjectId } } = require('mongoose');
const Account = require('../models/Account');
const { validateAccountInput } = require('./validations/validations');


module.exports = {
  currentUserAccounts: function(req, res) {
    const { user: { _id } } = req;
    Account.find(account => account.users.includes(_id))
      .then(users => res.json(users))
      .catch(err => res.status(404).json({ noAccountsFound: 'No accounts found for current user.' }))
  },
  singleAccount: function(req, res) {
    const { params: { accountId } } = req;
    Account.find(accountId)
      .then(account => res.json(account))
      .catch(err => res.status(404).json({ noAccountFound: 'No account found with that id.'}))
  },
  createAccount: function(req, res) {
    const { body, user: { _id } } = req;
    const { errors, isValid } = validateAccountInput(body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const { name } = body;
    const newAccount = new Account({
      name,
      admin: [_id],
    })

    newAccount.save().then(
      account => res.json(account),
      err => res.status(422).json(err)
    );
  }
}