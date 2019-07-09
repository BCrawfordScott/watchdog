const { compare } = require('bcryptjs');
const { securePassword } = require('../util/security');
const keys = require('../keys/keys.js');
const User = require('../models/User');

module.exports = {
  registerUser: function (user, req, res) {
    if (user) {
      console.log(user);
      return res.status(400).json({ email: 'That email is not available' })
    } else {
      const { email, username, password, photoUrl, accounts } = req.body;
      const user = new User({
        email,
        username,
        photoUrl,
        accounts,
        password,
      });

      securePassword(user.password, hash => {
        user.password = hash;
        user.save()
          .then(user => res.json(user))
          .catch(err => {
            console.log(err);
            return res.status(422).json(err);
          })
      })
    }
  },

  loginUser: function (user, password, res) {
    const authError = { auth: 'Invalid email or password' };

    if (!user) {
      return res.status(401).json(authError);
    }

    compare(password, user.password)
      .then(isMatch => {
        if (isMatch) {
          res.json({ msg: 'Success' });
        } else {
          return res.status(401).json(authError);
        }
      });
  }
};