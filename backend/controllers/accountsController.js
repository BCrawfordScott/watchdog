const { Types: { ObjectId } } = require('mongoose');
const Account = require('../models/Account');
const { validateAccountInput } = require('./validations/validations');
const { currentUser } = require('../services/authenticity');


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
    const { body } = req;
    const { errors, isValid } = validateAccountInput(body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    currentUser(req, res, user => {
        console.log('found current user');

        const { name } = body;
        const newAccount = new Account({
          name,
        })
        newAccount.admin.push(user);
        newAccount.save()
          .then(account => { 
            console.log('created account');
            user.accounts.push(account);
            user.save()
              .then(() => { console.log('saved user'); return res.json(account); })
              .catch(err => res.status(422).json(err))
            })
          .catch(err => res.status(422).json(err))
      });
  },
}